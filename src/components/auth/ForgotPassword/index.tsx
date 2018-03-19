import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getForgotPasswordToken } from '../../../state/actions';
import LoadingIndicator from '../Loading';

import './forgot_password.scss';
import './form-input.scss';

import Input from '../FormInput';

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
    const { handleSubmit, valid, waiting } = this.props;

    const formInputs = this.state.inputs.map((input, index) => <Input key={index} {...input} />);

    return (
      <section id="forgot-password-wrapper">
        <LoadingIndicator waiting={waiting} message={'One moment please.'} />
        <div id="forgot-password-card" className={waiting ? 'hide' : 'show'}>
          <h1>Forgot password</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            {formInputs}
            <button type="submit" disabled={!valid}>
              Reset Password
            </button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  waiting: state.auth.waiting,
  errorMessage: state.auth.error,
  message: state.auth.message,
  authenticated: state.auth.authenticated
});

export default withRouter(
  connect(mapStateToProps, { getForgotPasswordToken })(form(ForgotPassword))
);
