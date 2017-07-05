import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions';

const form = reduxForm({
  form: 'login'
});

export class Login extends React.Component {
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
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="input-group">
          <Field name="email" component={renderField} type="text" />
          <label htmlFor="">Email</label>
        </div>
        <div className="input-group">
          <Field name="password" component={renderField} type="password" />
          <label htmlFor="">Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default connect(mapStateToProps, { loginUser })(form(Login));
