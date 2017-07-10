import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { resetPassword } from '../../actions/index';

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

const renderField = field =>
  <div>
    <input className="form-control" {...field.input} />
    {field.touched &&
      field.error &&
      <div className="error">
        {field.error}
      </div>}
  </div>;

export class ResetPassword extends React.Component {
  static propTypes = {
    router: PropTypes.object
  };
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
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>New Password:</label>
          <Field name="password" component={renderField} type="password" />
        </fieldset>

        <fieldset>
          <label>Confirm New Password:</label>
          <Field
            name="passwordConfirm"
            component={renderField}
            type="password"
          />
        </fieldset>

        {this.renderAlert()}
        <button action="submit">Change Password</button>
      </form>
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
