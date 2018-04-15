import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';

import { validateInput } from '@/util';
import { loginUser } from '@/state/actions';

import { Input } from '@/ui/components/Input';

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
  };
  passwordInput: {
    isValid: boolean;
    value: string;
  };
}

const initialState: SSignInForm = {
  employeeNumberInput: {
    isValid: false,
    value: ''
  },
  passwordInput: {
    isValid: false,
    value: ''
  }
};

export class SignInForm extends PureComponent<PSignInForm, SSignInForm> {
  state = initialState;

  private employeeNumberInput: React.RefObject<HTMLInputElement> = createRef();
  private passwordInput: React.RefObject<HTMLInputElement> = createRef();

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

  handleInputChange = (inputId: any, isValid: boolean, value?: string) => {
    this.setState({
      [inputId]: {
        isValid: isValid,
        value: value
      }
    });
  };

  renderAPIMsg(): JSX.Element {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.errorMessage ? this.renderAPIMsg() : null}
        <form aria-labelledby={this.props.id} onSubmit={this.handleFormSubmit}>
          <fieldset>
            <legend id={this.props.id}>{this.props.legendText}</legend>
            <div className="input-wrapper">
              <Input
                type="text"
                name="employeeNumberInput"
                autoComplete="off"
                label="Employee Number"
                inputRef={this.employeeNumberInput}
                validationCb={this.handleInputChange}
                validateFn={validateInput(
                  'Please enter a valid employee number',
                  new RegExp(/^\w{1}\d+$/, 'gi')
                )}
              />
              <span className="focus-border" />
            </div>
            <div className="input-wrapper">
              <Input
                type="password"
                name="passwordInput"
                autoComplete="off"
                label="Password"
                inputRef={this.passwordInput}
                validationCb={this.handleInputChange}
                validateFn={validateInput(
                  'Please enter a password with at least 6 characters',
                  new RegExp(/.{6,}/, 'gi')
                )}
              />
              <span className="focus-border" />
            </div>
            <button
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
