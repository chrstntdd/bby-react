import React, { Component } from 'react';

import { Maybe, callAll } from '@/fp';
import { unwrapArray, noop } from '@/util';

interface InputField {
  value?: string;
  isValid?: boolean;
  hasBeenVisited?: boolean;
  validationMsg?: string;
  match?: string; // fieldKey TODO: consider NOT using strings as keys
  label?: string /** label to use for match validation msg */;
  required?: boolean;
  validationFn?: () => (val: string) => Maybe<string>;
}

interface PForm {
  id: string;
  className?: string;
  allFieldsRequired?: boolean;
  fieldDefaults: (string | InputField)[][];
  onInputChange?: (any) => any;
  onFormSubmit: (any) => any;
  render?: (any) => void;
  children?: (any) => void;
}

interface SForm {
  fields: Map<string, InputField>;
  fieldKeys: string[];
  allFieldsValid: boolean;
}

export class Form extends Component<PForm & React.HTMLProps<HTMLFormElement>, SForm> {
  constructor(props) {
    super(props);

    const state = {
      fields: new Map(this.props.fieldDefaults),
      fieldKeys: this.props.fieldDefaults.map(key => key[0]),
      allFieldsValid: false
    };

    state.fieldKeys.forEach(key => {
      state.fields.set(key, {
        ...state.fields.get(key),
        value: state.fields.get(key).value || '',
        isValid: true,
        hasBeenVisited: false
      });
    });

    this.state = state;
  }

  state;

  updateField = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const fieldKey = target.id;
    const value = target.value;

    this.setState(
      prevState => {
        prevState.fields.set(fieldKey, {
          ...prevState.fields.get(fieldKey),
          value
        });

        return {
          fields: prevState.fields
        };
      },
      () => {
        const field: InputField = this.state.fields.get(fieldKey);

        if ((field.validationFn && field.validationMsg && field.match) || field.validationFn) {
          this.validateInput(fieldKey);
        } else if (this.props.allFieldsRequired || (field.required && field.value !== '')) {
          /* CLEAR REQUIRED VALIDATION MSG */
          this.setState(prevState => {
            prevState.fields.set(fieldKey, {
              ...prevState.fields.get(fieldKey),
              validationMsg: '',
              isValid: true
            });

            return {
              fields: prevState.fields
            };
          });
        }
      }
    );
  };

  handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    if (this.state.allFieldsValid) {
      const values = this.state.fieldKeys.map(fieldKey => [
        fieldKey,
        this.state.fields.get(fieldKey).value.trim()
      ]);

      /* RETURNED AS A 2D MATRIX */
      this.props.onFormSubmit(values);
      this.clearFormValues();
    }
  };

  handleInputFocus = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const fieldKey = target.id;

    if (this.state.fields.get(fieldKey).hasBeenVisited === false) {
      this.setState(prevState => {
        prevState.fields.set(fieldKey, {
          ...prevState.fields.get(fieldKey),
          hasBeenVisited: true
        });

        return {
          fields: prevState.fields
        };
      });
    }
  };

  handleInputBlur = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const fieldKey = target.id;
    const field: InputField = this.state.fields.get(fieldKey);

    if ((!field.validationMsg && field.validationFn) || (!field.validationMsg && field.match)) {
      this.validateInput(fieldKey);
    }

    this.props.allFieldsRequired || field.required ? this.checkRequired(fieldKey) : null;
  };

  checkRequired(fieldKey) {
    const field: InputField = this.state.fields.get(fieldKey);

    if ((this.props.allFieldsRequired || field.required) && field.value === '') {
      this.setState(prevState => {
        prevState.fields.set(fieldKey, {
          ...prevState.fields.get(fieldKey),
          isValid: false,
          validationMsg: 'This field is required'
        });

        return {
          fields: prevState.fields
        };
      });
    }
  }

  clearFormValues() {
    this.setState(prevState => {
      prevState.fieldKeys.forEach(key => {
        prevState.fields.set(key, {
          ...prevState.fields.get(key),
          value: '',
          isValid: true,
          hasBeenVisited: false
        });
      });

      return {
        fields: prevState.fields,
        allFieldsValid: false
      };
    });
  }

  validateMatch(fieldKey, matchKey) {
    const field: InputField = this.state.fields.get(fieldKey);
    const fieldToMatch: InputField = this.state.fields.get(matchKey);

    if (field.value !== fieldToMatch.value && field.hasBeenVisited && fieldToMatch.hasBeenVisited) {
      /* TODO: Ensure both fields have a label for this case */
      return {
        isValid: false,
        validationMsg: `${field.label} should be the same as ${fieldToMatch.label}`
      };
    } else {
      return {
        isValid: true,
        validationMsg: ''
      };
    }
  }

  validateInput(fieldKey) {
    let fieldsToUpdate;
    const inputField: InputField = this.state.fields.get(fieldKey);
    const validationMsg: Maybe<string> = inputField.validationFn()(inputField.value);

    validationMsg.caseOf({
      /* FIELD IS INVALID */
      just: validationMsg => {
        fieldsToUpdate = {
          isValid: false,
          validationMsg
        };
      },

      /* FIELD IS VALID */
      nothing: () => {
        /* TODO: find way to chain validators */
        const matchKey = inputField.match;
        /* CHECK IF FIELD SHOULD MATCH ANOTHER FIELD VALUE */
        if (matchKey) {
          fieldsToUpdate = this.validateMatch(fieldKey, matchKey);
        } else {
          fieldsToUpdate = {
            isValid: true,
            validationMsg: ''
          };
        }
      }
    });

    this.setState(
      prevState => {
        prevState.fields.set(fieldKey, {
          ...prevState.fields.get(fieldKey),
          ...fieldsToUpdate
        });

        return {
          fields: prevState.fields
        };
      },
      () => {
        this.validateWholeForm();
      }
    );
  }

  validateWholeForm() {
    /* TODO: account for individually required fields */
    this.setState({
      allFieldsValid: this.state.fieldKeys.every(key => {
        const field: InputField = this.state.fields.get(key);

        return this.props.allFieldsRequired
          ? field.isValid && field.hasBeenVisited && !field.validationMsg && field.value !== ''
          : field.isValid && field.hasBeenVisited && !field.validationMsg;
      })
    });
  }

  getInputProps = props => {
    const field = this.state.fields.get(props.id);

    return {
      ...props,
      id: props.id,
      value: field.value,
      isValid: field.isValid,
      validationMsg: field.validationMsg,
      className: field.value === '' ? '' : 'has-content',
      onChange: callAll(props.onChange, this.updateField),
      onBlur: callAll(props.onBlur, this.handleInputBlur),
      onFocus: callAll(props.onFocus, this.handleInputFocus)
    };
  };

  getFormState = () => {
    return {
      allFieldsValid: this.state.allFieldsValid
    };
  };

  getStateAndHelpers() {
    return {
      getInputProps: this.getInputProps,
      getFormState: this.getFormState
    };
  }

  render() {
    /* allow for render or child props */
    const children = unwrapArray(this.props.render || this.props.children, noop);
    const element = unwrapArray(children(this.getStateAndHelpers()));

    return (
      <form
        aria-labelledby={this.props.id}
        className={this.props.className}
        onSubmit={this.handleFormSubmit}
      >
        {element}
      </form>
    );
  }
}

export default Form;
