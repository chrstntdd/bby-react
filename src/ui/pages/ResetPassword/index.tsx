import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { validateInput } from '@/util';

import { resetPassword } from '@/state/actions';
import LoadingIndicator from '@/ui/components/Loading';
import Input from '@/ui/components/Input';

import './reset_password.scss';

interface PResetPassword {
  resetPassword: (resetToken: string, newPassword: string) => (dispatch: any) => Promise<void>;
  waiting: boolean;
  errorMessage: string;
  message: string;
}

interface SResetPassword {}

export class ResetPassword extends Component<
  PResetPassword & RouteComponentProps<{}>,
  SResetPassword
> {
  state = {
    passwordInput: {
      isValid: false,
      value: ''
    },
    passwordConfirmInput: {
      isValid: false,
      value: ''
    }
  };

  private passwordInput: React.RefObject<HTMLInputElement> = createRef();
  private passwordConfirmInput: React.RefObject<HTMLInputElement> = createRef();

  handleFormSubmit() {
    /* TODO: USE WINDOW.LOCATION.SEARCH */
    const { search } = window.location;

    // this.props.resetPassword(resetToken, newPassword);
    this.props.history.push('/dashboard');
  }

  /* TODO: handle rendering api error message */

  // renderAlert() {
  //   if (this.props.errorMessage) {
  //     return (
  //       <div className="error-message">
  //         <p>{this.props.errorMessage}</p>
  //       </div>
  //     );
  //   } else if (this.props.message) {
  //     return (
  //       <div className="success-message">
  //         <p>{this.props.message}</p>
  //       </div>
  //     );
  //   }
  // }

  handleInputChange = (inputId: any, isValid: boolean, value?: string) => {
    this.setState({
      [inputId]: {
        isValid: isValid,
        value: value
      }
    });
  };

  render() {
    const { waiting } = this.props;

    return (
      <section id="reset-password-wrapper">
        <LoadingIndicator waiting={waiting} message={'One moment please.'} />
        <div id="reset-password-card" className={waiting ? 'hide' : 'show'}>
          <form aria-labelledby="reset-password" onSubmit={this.handleFormSubmit}>
            <fieldset id="reset-password">
              <legend>Reset Password</legend>
              <div className="input-wrapper">
                <Input
                  type="password"
                  name="passwordInput"
                  autoComplete="off"
                  label="Password"
                  inputRef={this.passwordInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a password with at least 6 characters',
                    new RegExp(/.{6,}/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>
              <div className="input-wrapper">
                <Input
                  type="password"
                  name="confirmPasswordInput"
                  autoComplete="off"
                  label="Confirm Password"
                  inputRef={this.passwordConfirmInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a password with at least 6 characters',
                    new RegExp(/.{6,}/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>
              <button type="submit">Change Password</button>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  waiting: state.auth.waiting,
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default withRouter(connect(mapStateToProps, { resetPassword })(ResetPassword));
