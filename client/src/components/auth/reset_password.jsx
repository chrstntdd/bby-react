import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { resetPassword } from '../../actions/index';

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
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.props.history.push('/dashboard');
    }
  }
  handleFormSubmit({ password }, formProps) {
    const resetToken = this.props.match.params.resetToken;
    this.props.resetPassword(resetToken, { password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>OOPS!</strong>
          {this.props.errorMessage}
        </div>
      );
    } else if (this.props.message) {
      return (
        <div>
          <strong>Success!</strong>
          {this.props.message}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;

    const formInputs = this.state.inputs.map((input, index) =>
      <Input key={index} {...input} />
    );

    return (
      <section id="reset-password-wrapper">
        <div id="reset-password-card">
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
  errorMessage: state.auth.error,
  message: state.auth.resetMessage
});

export default withRouter(
  connect(mapStateToProps, { resetPassword })(form(ResetPassword))
);
