import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { loginUser } from '@/state/actions';
import { Input } from '@/components/Input';
import { validateInput } from '@/util';

import LoadingIndicator from '../Loading';

import './login.scss';

interface PLogin {
  loginUser: (employeeNumber: string, password: string) => (dispatch: any) => Promise<void>;
  waiting: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
}

interface SLogin {
  employeeNumberInput: {
    isValid: boolean;
    value: string;
  };
  passwordInput: {
    isValid: boolean;
    value: string;
  };
}

const initialState: SLogin = {
  employeeNumberInput: {
    isValid: false,
    value: ''
  },
  passwordInput: {
    isValid: false,
    value: ''
  }
};

export class Login extends Component<PLogin & RouteComponentProps<{}>, SLogin> {
  state = initialState;

  private employeeNumberInput: HTMLInputElement = createRef();
  private passwordInput: HTMLInputElement = createRef();

  componentDidMount() {
    this.props.isAuthenticated ? this.props.history.push('/dashboard') : null;
  }

  static getDerivedStateFromProps(nextProps: PLogin) {
    if (nextProps.errorMessage) {
      initialState;
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps: PLogin) {
    /* IF NEW ERROR MESSAGE CAME IN, RESET INPUT WITH FOCUS ON THE FIRST FIELD */
    /* ERROR MESSAGE IS CLEARED BEFORE EACH USER LOGIN ROUTINE */
    if (prevProps.errorMessage === '' && this.props.errorMessage) {
      this.employeeNumberInput.current.value = '';
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

  renderAPIMsg(): JSX.Element {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  handleInputChange = (inputId: any, isValid: boolean, value?: string) => {
    this.setState({
      [inputId]: {
        isValid: isValid,
        value: value
      }
    });
  };

  render() {
    const { waiting, errorMessage } = this.props;

    return (
      <section id="login-wrapper">
        <LoadingIndicator waiting={waiting} message="Signing you in now. Please wait." />

        {errorMessage ? this.renderAPIMsg() : null}

        <div id="login-card" className={waiting ? 'hide' : 'show'}>
          <h1>Sign In</h1>
          <form onSubmit={this.handleFormSubmit}>
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
                !(this.state.employeeNumberInput.isValid && this.state.passwordInput.isValid)
              }
            >
              Login
            </button>
          </form>

          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/sign-up">Sign Up</Link>
          <p>Just testing? Use the temporary credentials below.</p>
        </div>
        <div className="test-credentials">
          <p>
            <span>Employee Number</span>: a1
          </p>
          <p>
            <span>Password</span>: testtesttest
          </p>
        </div>
      </section>
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

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
