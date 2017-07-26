import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { confirmEmail } from '../../actions/index';

import './verify_email.scss';

export class VerifyEmail extends React.Component {
  componentDidMount() {
    const verifyEmailToken = this.props.match.params.verifyToken;
    this.props.confirmEmail(verifyEmailToken);
  }

  redirectToDash() {
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <section id="confirm-email-wrapper">
        <div id="confirm-email-card">
          <h1>Thank you for registering you account!</h1>
          <button onClick={() => this.redirectToDash()}>Get started</button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  //
});

export default withRouter(
  connect(mapStateToProps, { confirmEmail })(VerifyEmail)
);
