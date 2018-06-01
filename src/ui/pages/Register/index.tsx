import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingIndicator from '@/ui/components/Loading';
import RegisterForm from '@/ui/pages/Register/RegisterForm';

import './register.scss';

interface PRegister {
  waiting: boolean;
  message: string;
  errorMessage: string;
  isAuthenticated: boolean;
}

interface SRegister {}

export class Register extends PureComponent<PRegister, SRegister> {
  cardClass = 'bg-white-darkest mx-auto shadow-lg rounded-b overflow-hidden flex flex-col items-center justify-center';
  linkClass = 'my-4 blue-accent hover:text-bby-blue no-underline';

  renderAPIMsg(): JSX.Element {
    window.scroll({ top: 0, behavior: 'smooth' });
    if (this.props.errorMessage) {
      return (
        <div className="error-message">
          <p>{this.props.errorMessage}</p>
        </div>
      );
    } else if (this.props.message) {
      return (
        <div className="success-message">
          <p>{this.props.message}</p>
        </div>
      );
    }
    return null;
  }

  render() {
    const { waiting } = this.props;

    return (
      <main id="register-wrapper">
        {!waiting ? null : (
          <LoadingIndicator waiting={waiting} message="Setting things up real quick. Hang tight." />
        )}
        {this.renderAPIMsg()}

        <div id="register-card" className={waiting ? 'hide' : `show ${this.cardClass}`}>
          <RegisterForm className={this.cardClass} id="sign-up" />

          <Link className={this.linkClass} to="/sign-in">
            Sign In
          </Link>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  waiting: auth.waiting,
  message: auth.message,
  errorMessage: auth.error
});

export default connect(mapStateToProps)(Register);
