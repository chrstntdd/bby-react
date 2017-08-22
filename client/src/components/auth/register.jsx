import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, withRouter } from 'react-router-dom';
import { registerUser } from '../../actions';
import Input from './form-input';
import './register.scss';

const Scroll = require('react-scroll');
const Element = Scroll.Element;

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
          label: 'Employee Number'
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
          <p>
            {this.props.errorMessage}
          </p>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, valid } = this.props;

    const formInputs = this.state.registerInputs.map((input, index) =>
      <Input key={index} {...input} />
    );
    return (
      <Element id="register-section" name="register">
        <section id="register-card">
          <h1>Register here</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            {formInputs}
            <button disabled={!valid} type="submit">
              Sign Up
            </button>
          </form>
        </section>
      </Element>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.auth.message,
  authenticated: state.auth.authenticated
});

export default withRouter(
  connect(mapStateToProps, { registerUser })(form(Register))
);
