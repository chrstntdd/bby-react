import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, withRouter } from 'react-router-dom';
import { registerUser } from '../../actions';
import './register.scss';

const Scroll = require('react-scroll');
const Element = Scroll.Element;

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field =>
  <div>
    <input className="form-control" {...field.input} />
    {field.touched &&
      field.error &&
      <div className="error">
        {field.error}
      </div>}
  </div>;

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
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span>
            <strong>ERROR!</strong>
            {this.props.errorMessage}
          </span>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    const form = (
      <Element id="register-section" name="register">
        <section id="register-card">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div className="input-group">
              <Field name="firstName" component={renderField} type="text" />
              <label htmlFor="">First Name</label>
            </div>
            <div className="input-group">
              <Field name="lastName" component={renderField} type="text" />
              <label htmlFor="">Last Name</label>
            </div>
            <div className="input-group">
              <Field name="email" component={renderField} type="text" />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
              <Field name="password" component={renderField} type="password" />
              <label htmlFor="">Password</label>
            </div>
            <button type="submit">Register</button>
          </form>
        </section>
      </Element>
    );
    return form;
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
