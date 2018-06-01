import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { getFirstQueryParamVal } from '@/util';

import { confirmEmail } from '@/state/routines';

import './verify_email.scss';

interface PVerifyEmail {
  confirmEmail: (confirmationToken: string) => (dispatch: any) => Promise<void>;
}

interface SVerifyEmail {}

export class VerifyEmail extends Component<PVerifyEmail & RouteComponentProps<{}>, SVerifyEmail> {
  componentDidMount() {
    const confirmationToken = getFirstQueryParamVal();
    this.props.confirmEmail(confirmationToken);
  }

  redirectToDash = () => {
    this.props.history.push('/dashboard');
  };

  buttonClass = 'mx-auto my-2 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white trans-300ms-all';
  cardClass = 'bg-white-darkest mx-auto max-w-sm shadow-lg rounded-b overflow-hidden flex flex-col items-center justify-center ';
  headingClass = 'text-center text-2xl blue-accent';

  render() {
    return (
      <section id="confirm-email-wrapper">
        <div id="confirm-email-card" className={this.cardClass}>
          <h1 className={this.headingClass}>Thank you for registering your account!</h1>
          <button className={this.buttonClass} onClick={this.redirectToDash}>
            Get started
          </button>
        </div>
      </section>
    );
  }
}

export default withRouter(connect(null, { confirmEmail })(VerifyEmail));
