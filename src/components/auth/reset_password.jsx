import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { resetPassword } from '../../actions/index';
import LoadingIndicator from './loading';
import 'url-search-params-polyfill';

import Input from './form-input';
import './form-input.scss';

import './reset_password.scss';

const form = reduxForm({
  form: 'resetPassword',
  validate
});

export const validate = formProps => {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter a new password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm new password';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

export class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [
        {
          name: 'password',
          type: 'password',
          label: 'Password'
        },
        {
          name: 'passwordConfirm',
          type: 'password',
          label: 'Confirm Password'
        }
      ]
    };
  }

  async handleFormSubmit({ password }, formProps) {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const resetToken = params.get('token');
    await this.props.resetPassword(resetToken, { password });
    this.props.history.push('/dashboard');
  }
  renderAlert() {
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
  }
  render() {
    const { handleSubmit, waiting } = this.props;

    const formInputs = this.state.inputs.map((input, index) => (
      <Input key={index} {...input} />
    ));

    return (
      <section id="reset-password-wrapper">
        <LoadingIndicator waiting={waiting} message={'One moment please.'} />
        <div id="reset-password-card" className={waiting ? 'hide' : 'show'}>
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            {formInputs}
            <button action="submit">Change Password</button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  waiting: state.auth.waiting,
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default withRouter(
  connect(mapStateToProps, { resetPassword })(form(ResetPassword))
);
