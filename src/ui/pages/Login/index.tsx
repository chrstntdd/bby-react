import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import LoadingIndicator from '@/ui/components/Loading';
import SignInForm from './SignInForm';

import './login.scss';

interface PLogin {
  waiting: boolean;
  isAuthenticated: boolean;
}

interface SLogin {}

export class Login extends PureComponent<PLogin & RouteComponentProps<{}>, SLogin> {
  componentDidUpdate() {
    this.props.isAuthenticated ? this.props.history.push('/dashboard') : null;
  }

  cardClass = 'bg-white-darkest mx-auto max-w-sm shadow-lg rounded-b overflow-hidden flex flex-col items-center justify-center';
  linkClass = 'blue-accent hover:text-bby-blue no-underline';
  headingClass = 'text-4xl text-bby-blue text-center mx-auto';

  render() {
    const { waiting } = this.props;

    return (
      <main id="login-wrapper">
        <LoadingIndicator waiting={waiting} message="Signing you in now. Please wait." />

        <h1 className={this.headingClass}>Welcome to Quantified</h1>

        <div id="login-card" className={waiting ? 'hide' : `show ${this.cardClass}`}>
          <SignInForm id="sign-in" legendText="Sign In" />

          <Link className={this.linkClass} to="/forgot-password">
            Forgot password?
          </Link>
          <Link className={this.linkClass} to="/sign-up">
            Sign Up
          </Link>
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
      </main>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    waiting: auth.waiting,
    isAuthenticated: auth.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(Login));
