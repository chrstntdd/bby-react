import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getForgotPasswordToken } from '../../actions/index';
import PropTypes from 'prop-types';

const form = reduxForm({
  form: 'forgotPassword'
});

export class ForgotPassword extends React.Component {
  static propTypes = {
    router: PropTypes.object
  };
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

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          {this.renderAlert()}
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
          <button type="submit">Reset Password</button>
        </div>
      </form>
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
