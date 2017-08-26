import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getForgotPasswordToken } from '../../actions/index';

import './forgot_password.scss';

import './form-input.scss';
import Input from './form-input';

const form = reduxForm({
  form: 'forgotPassword'
});

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [
        {
          name: 'employeeNumber',
          type: 'text',
          label: 'Employee Number'
        }
      ]
    };
  }
  handleFormSubmit(formProps) {
    this.props.getForgotPasswordToken(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span>
            <strong>Error!</strong> {this.props.errorMessage}
          </span>
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
      <section id="forgot-password-wrapper">
        <div id="forgot-password-card">
          <h1>Forgot password</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            {formInputs}
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.auth.message,
  authenticated: state.auth.authenticated
});

export default withRouter(
  connect(mapStateToProps, { getForgotPasswordToken })(form(ForgotPassword))
);
