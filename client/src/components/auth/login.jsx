import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { loginUser } from '../../actions';
import Input from './form-input';
import LoadingIndicator from './loading';
import './form-input.scss';
import './login.scss';

const form = reduxForm({
  form: 'login'
});

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInputs: [
        {
          name: 'employeeNumber',
          type: 'text',
          label: 'Employee Number'
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password'
        }
      ]
    };
  }
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
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

    const formInputs = this.state.loginInputs.map((input, index) =>
      <Input key={index} {...input} />
    );

    const form = (
      <section id="login-wrapper">
        <div
          id="loading-container"
          className={this.props.waiting ? 'show' : 'hide'}
        >
          <LoadingIndicator />
          <p>Loading. Please wait.</p>
        </div>
        <div className="test-credentials">
          <p>
            <span>Employee Number</span>: a1
          </p>
          <p>
            <span>Password</span>: testtesttest
          </p>
        </div>
        {this.renderAlert()}
        <div id="login-card" className={this.props.waiting ? 'hide' : 'show'}>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {formInputs}
            <button type="submit" disabled={!valid}>
              Login
            </button>
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/sign-up">Sign Up</Link>
            <p>Just testing? Use the temporary credentials below.</p>
          </form>
        </div>
      </section>
    );
    // IF AUTHENTICATED, REDIRECT TO DASHBOARD
    return this.props.authenticated ? <Redirect to="/dashboard" /> : form;
  }
}

const mapStateToProps = state => ({
  waiting: state.auth.waiting,
  errorMessage: state.auth.error,
  message: state.auth.message,
  authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps, { loginUser })(form(Login)));
