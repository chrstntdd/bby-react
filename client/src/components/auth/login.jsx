import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { loginUser } from '../../actions';
import Cookies from 'universal-cookie';
import Input from './form-input';
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
  componentDidMount() {
    const cookie = new Cookies();
    const token = cookie.get('token');
  }
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span>
            <strong>Error!</strong>
            {this.props.errorMessage}
          </span>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;

    const formInputs = this.state.loginInputs.map((input, index) =>
      <Input key={index} {...input} />
    );

    const form = (
      <section id="login-wrapper">
        <div id="login-card">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            {formInputs}
            <button type="submit">Login</button>
            <Link to="/forgot-password">Forgot password?</Link>
          </form>
        </div>
      </section>
    );
    // IF AUTHENTICATED, REDIRECT TO DASHBOARD
    return this.props.authenticated ? <Redirect to="/dashboard" /> : form;
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.auth.message,
  authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps, { loginUser })(form(Login)));
