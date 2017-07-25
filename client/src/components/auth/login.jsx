import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { loginUser } from '../../actions';
import Cookies from 'universal-cookie';

const form = reduxForm({
  form: 'login'
});

export class Login extends React.Component {
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
    const form = (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="input-group">
          <Field name="employeeNumber" component="input" type="text" />
          <label htmlFor="">Employee Number</label>
        </div>
        <div className="input-group">
          <Field name="password" component="input" type="password" />
          <label htmlFor="">Password</label>
        </div>
        <button type="submit">Login</button>
        <Link to="/forgot-password">
          <button>Forgot password?</button>
        </Link>
      </form>
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
