import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, withRouter } from 'react-router-dom';
import { registerUser } from '../../actions';
import Input from './form-input';
import LoadingIndicator from './loading';

import './register.scss';

const form = reduxForm({
  form: 'register',
  validate
});

const validate = formProps => {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name.';
  }
  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name.';
  }
  if (!formProps.email) {
    errors.email = 'Please enter an email.';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  return errors;
};

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerInputs: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name'
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name'
        },
        {
          name: 'storeNumber',
          type: 'number',
          label: 'Store Number'
        },
        {
          name: 'employeeNumber',
          type: 'text',
          label: 'Employee Number (eg: a1234567)'
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          label: 'Confirm Password'
        }
      ]
    };
  }
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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

    const formInputs = this.state.registerInputs.map((input, index) => (
      <Input key={index} {...input} />
    ));
    return (
      <section id="register-section">
        {this.renderAlert()}
        <LoadingIndicator
          waiting={waiting}
          message={'Setting things up real quick. Hang tight.'}
        />
        <section id="register-card" className={waiting ? 'hide' : 'show'}>
          <h1>Register here</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {formInputs}
            <button disabled={!valid} type="submit">
              Sign Up
            </button>
          </form>
        </section>
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
  connect(mapStateToProps, { registerUser })(form(Register))
);
