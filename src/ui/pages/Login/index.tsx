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

  render() {
    const { waiting } = this.props;

    return (
      <section id="login-wrapper">
        <LoadingIndicator waiting={waiting} message="Signing you in now. Please wait." />

        <div id="login-card" className={waiting ? 'hide' : 'show'}>
          <SignInForm id="sign-in" legendText="Sign In" />

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
    isAuthenticated: auth.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(Login));
