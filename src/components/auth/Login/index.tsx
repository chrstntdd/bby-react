import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { loginUser } from '../../../state/actions';
import LoadingIndicator from '../Loading';

import './login.scss';

interface PLogin {
  loginUser: (employeeNumber: string, password: string) => any;
  waiting: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
}

interface SLogin {
  employeeNumberInput: {
    value: string;
    isValid: boolean;
  };
  passwordInput: {
    value: string;
    isValid: boolean;
  };
}

enum LoginInput {
  'employeeNumberInput',
  'passwordInput'
}

const initialState: SLogin = {
  employeeNumberInput: {
    value: '',
    isValid: true
  },
  passwordInput: {
    value: '',
    isValid: true
  }
};

export class Login extends PureComponent<PLogin, SLogin> {
  state = initialState;

  private employeeNumberInput: HTMLInputElement = createRef();
  private passwordInput: HTMLInputElement = createRef();

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

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { employeeNumberInput, passwordInput } = this.state;

    if (employeeNumberInput.isValid && passwordInput.isValid) {
      this.props.loginUser(employeeNumberInput.value.trim(), passwordInput.value.trim());
    } else {
      /* ERROR */
    }
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>, inputId: LoginInput) => {
    this.setState({
      [inputId]: {
        ...this.state[inputId],
        value: e.currentTarget.value
      }
    });
  };

  renderAlert() {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  render() {
    const { waiting, errorMessage } = this.props;

    const isFormValid = true;

    const loginPage = (
      <section id="login-wrapper">
        <LoadingIndicator waiting={waiting} message={'Signing you in now. Please wait.'} />

        {errorMessage ? this.renderAlert() : null}

        <div id="login-card" className={waiting ? 'hide' : 'show'}>
          <h1>Sign In</h1>
          <form onSubmit={e => this.handleFormSubmit(e)}>
            <input
              type="text"
              placeholder="Employee Number"
              ref={this.employeeNumberInput}
              onChange={e => this.handleInputChange(e, 'employeeNumberInput')}
            />
            <input
              type="password"
              placeholder="Password"
              minLength={6}
              maxLength={36}
              ref={this.passwordInput}
              onChange={e => this.handleInputChange(e, 'passwordInput')}
            />
            <button type="submit" disabled={!isFormValid}>
              Login
            </button>

            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/sign-up">Sign Up</Link>
            <p>Just testing? Use the temporary credentials below.</p>
          </form>
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
    // IF  isAuthenticated, REDIRECT TO DASHBOARD
    return this.props.isAuthenticated ? <Redirect to="/dashboard" /> : loginPage;
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    waiting: auth.waiting,
    errorMessage: auth.error,
    isAuthenticated: auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
