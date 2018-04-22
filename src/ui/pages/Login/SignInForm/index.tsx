import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';

import { Maybe } from '@/fp';
import { debounce } from '@/util';
import { validateInput } from '@/util';
import { loginUser } from '@/state/actions';

import Input from '@/ui/components/Input';

import './input.scss';

interface PSignInForm {
  loginUser: (employeeNumber: string, password: string) => (dispatch: any) => Promise<void>;
  id: string;
  legendText: string;
  waiting: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
}

interface SSignInForm {
  employeeNumberInput: {
    isValid: boolean;
    value: string;
    validationMsg: string;
    validatorFn: () => (val: any) => Maybe<string>;
  };
  passwordInput: {
    isValid: boolean;
    value: string;
    validationMsg: string;
    validatorFn: () => (val: any) => Maybe<string>;
  };
}

export const initialState: SSignInForm = {
  employeeNumberInput: {
    isValid: false,
    value: '',
    validationMsg: '',
    validatorFn: () =>
      validateInput('Please enter a valid employee number', new RegExp(/^\w{1}\d+$/, 'gi'))
  },
  passwordInput: {
    isValid: false,
    value: '',
    validationMsg: '',
    validatorFn: () =>
      validateInput('Please enter a password with at least 6 characters', new RegExp(/.{6,}/, 'gi'))
  }
};

export class SignInForm extends PureComponent<PSignInForm, SSignInForm> {
  state = initialState;

  employeeNumberInput: React.RefObject<HTMLInputElement> = createRef();
  passwordInput: React.RefObject<HTMLInputElement> = createRef();

  static getDerivedStateFromProps(nextProps: PSignInForm) {
    if (nextProps.errorMessage) {
      return initialState;
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps: PSignInForm) {
    /* IF NEW ERROR MESSAGE CAME IN, RESET INPUT WITH FOCUS ON THE FIRST FIELD */
    /* ERROR MESSAGE IS CLEARED BEFORE EACH USER LOGIN ROUTINE */
    if (prevProps.errorMessage === '' && this.props.errorMessage) {
      this.employeeNumberInput.current.className = '';
      this.employeeNumberInput.current.value = '';
      this.passwordInput.current.className = '';
      this.passwordInput.current.value = '';

      this.employeeNumberInput.current.focus();
    }
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { employeeNumberInput, passwordInput } = this.state;

    if (employeeNumberInput.isValid && passwordInput.isValid) {
      this.props.loginUser(employeeNumberInput.value.trim(), passwordInput.value.trim());
    }
  };

  handleInputChange = debounce((inputValue, fieldKey) => {
    const field = this.state[fieldKey];
    const validationMsg = field.validatorFn()(inputValue);

    validationMsg.caseOf({
      /* FIELD IS INVALID */
      just: msg => {
        this.setState({
          [fieldKey]: {
            ...field,
            isValid: false,
            validationMsg: msg
          }
        });
      },

      /* FIELD IS VALID */
      nothing: () => {
        this.setState({
          [fieldKey]: {
            ...field,
            isValid: true,
            validationMsg: ''
          }
        });
      }
    });
  }, 200);

  updateField = e => {
    const inputValue = e.currentTarget.value;
    const fieldKey = e.currentTarget.id;

    this.handleInputChange(inputValue, fieldKey);
  };

  renderAPIMsg(): JSX.Element {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  fieldsetClass = 'flex flex-col items-center justify-center';
  legendClass = 'text-center text-3xl mx-auto my-3 blue-accent';
  submitButtonClass = 'mx-auto my-4 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white trans-300ms-all';
  inputClass = 'm-8';
  formClass = 'w-full';

  render() {
    return (
      <React.Fragment>
        {this.props.errorMessage ? this.renderAPIMsg() : null}
        <form
          className={this.formClass}
          aria-labelledby={this.props.id}
          onSubmit={this.handleFormSubmit}
        >
          <fieldset className={this.fieldsetClass}>
            <legend className={this.legendClass} id={this.props.id}>
              {this.props.legendText}
            </legend>
            <div className={`input-wrapper ${this.inputClass}`}>
              <Input
                type="text"
                id="employeeNumberInput"
                label="Employee Number"
                inputRef={this.employeeNumberInput}
                onChange={this.updateField}
                className={this.state.employeeNumberInput.value === '' ? '' : 'has-content'}
                validationMsg={this.state.employeeNumberInput.validationMsg}
              />
            </div>
            <div className={`input-wrapper ${this.inputClass}`}>
              <Input
                type="password"
                id="passwordInput"
                label="Password"
                inputRef={this.passwordInput}
                onChange={this.updateField}
                className={this.state.passwordInput.value === '' ? '' : 'has-content'}
                validationMsg={this.state.passwordInput.validationMsg}
              />
            </div>
            <button
              className={this.submitButtonClass}
              type="submit"
              disabled={
                !Object.values(this.state)
                  .map(v => v.isValid)
                  .every(Boolean)
              }
            >
              Sign in
            </button>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    waiting: auth.waiting,
    errorMessage: auth.error,
    isAuthenticated: auth.isAuthenticated
  };
};

export default connect(mapStateToProps, {
  loginUser
})(SignInForm);
