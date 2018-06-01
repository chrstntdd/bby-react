import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import LoadingIndicator from '@/ui/components/Loading';
import SignInForm from './SignInForm';

import './Login.scss';

interface PLogin {
  waiting: boolean;
  isAuthenticated: boolean;
  errorMessage: string;
}

interface SLogin {}

export class Login extends PureComponent<PLogin & RouteComponentProps<{}>, SLogin> {
  componentDidUpdate() {
    this.props.isAuthenticated ? this.props.history.push('/dashboard') : null;
  }

  renderAPIMsg(): JSX.Element {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  cardClass = 'bg-white-darkest mx-auto max-w-sm shadow-lg rounded-b overflow-hidden flex flex-col items-center justify-center ';
  linkClass = 'mb-2 blue-accent hover:text-bby-blue no-underline';

  render() {
    const { waiting, errorMessage } = this.props;

    return (
      <main id="login-wrapper">
        {!waiting ? null : (
          <LoadingIndicator waiting={waiting} message="Signing you in now. Please wait." />
        )}
        {errorMessage ? this.renderAPIMsg() : null}

        <div id="login-card" className={waiting ? 'hide' : `show ${this.cardClass}`}>
          <SignInForm id="sign-in" />

          <div className="link-container w-full flex flex-col items-center">
            <Link className={this.linkClass} to="/forgot-password">
              Forgot password?
            </Link>
            <Link className={this.linkClass} to="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="test-credentials p-2 flex flex-col justify-center items-center w-full">
          <p>Just testing? Use the temporary credentials below</p>
          <p>
            <strong>Employee Number</strong>: a1
          </p>
          <p>
            <strong>Password</strong>: testtesttest
          </p>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    errorMessage: auth.error,
    waiting: auth.waiting,
    isAuthenticated: auth.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(Login));
