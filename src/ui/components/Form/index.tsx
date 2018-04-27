import React, { Component } from 'react';

import { Maybe, callAll } from '@/fp';
import { debounce } from '@/util';

interface InputField {
  value?: string;
  isValid?: boolean;
  touched?: boolean;
  validationMsg?: string;
  validationFn?: () => (val: string) => Maybe<string>;
}

interface PForm {
  id: string;
  className?: string;
  fieldDefaults: (string | InputField)[][];
  onInputChange?: (any) => any;
  onFormSubmit: (any) => any;
  render: (any) => void;
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
        touched: false
      });
    });

    this.state = state;
  }

  updateField = event => {
    const fieldKey = event.target.id;
    const value = event.target.value;

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
      () => this.validateInput(fieldKey)
    );
  };

  handleFormSubmit = e => {
    e.preventDefault();

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

  handleInputFocus = e => {
    const fieldKey = e.target.id;

    if (this.state.fields.get(fieldKey).touched === false) {
      this.setState(prevState => {
        prevState.fields.set(fieldKey, {
          ...prevState.fields.get(fieldKey),
          touched: true
        });

        return {
          fields: prevState.fields
        };
      });
    }
  };

  clearFormValues() {
    this.setState(prevState => {
      prevState.fieldKeys.forEach(key => {
        prevState.fields.set(key, {
          ...prevState.fields.get(key),
          value: '',
          isValid: true,
          touched: false
        });
      });

      return {
        fields: prevState.fields
      };
    });
  }

  validateInput = debounce(fieldKey => {
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
        fieldsToUpdate = {
          isValid: true,
          validationMsg: ''
        };
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
      () => this.validateWholeForm()
    );
  }, 400);

  validateWholeForm() {
    this.setState({
      allFieldsValid: this.state.fieldKeys.every(key => {
        const field = this.state.fields.get(key);

        return field.isValid && field.value !== '';
      })
    });
  }

  getInputProps = ({ id, onChange, onFocus, ...rest } = {}) => {
    const field = this.state.fields.get(id);

    return {
      ...rest,
      id,
      value: field.value,
      isValid: field.isValid,
      validationMsg: field.validationMsg,
      className: field.value === '' ? '' : 'has-content',
      onChange: callAll(onChange, this.updateField),
      onFocus: callAll(onFocus, this.handleInputFocus)
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
    return (
      <form className={this.props.className} onSubmit={this.handleFormSubmit}>
        {this.props.render(this.getStateAndHelpers())}
      </form>
    );
  }
}

export default Form;
