import 'url-search-params-polyfill';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { confirmEmail } from '../../../state/actions';

import './verify_email.scss';

export class VerifyEmail extends Component {
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token');
    this.props.confirmEmail(token);
  }

  redirectToDash() {
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <section id="confirm-email-wrapper">
        <div id="confirm-email-card">
          <h1>Thank you for registering your account!</h1>
          <button onClick={() => this.redirectToDash()}>Get started</button>
        </div>
      </section>
    );
  }
}

export default withRouter(connect(null, { confirmEmail })(VerifyEmail));
