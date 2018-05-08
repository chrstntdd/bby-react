import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { validateInput, getFirstQueryParamVal } from '@/util';

import { resetPassword } from '@/state/routines';

import LoadingIndicator from '@/ui/components/Loading';
import Input from '@/ui/components/Input';
import Form from '@/ui/components/Form';

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
    fieldDefaults: [
      [
        'newPasswordInput',
        {
          validationFn: () =>
            validateInput(
              'Please enter a password with at least 6 characters',
              new RegExp(/.{6,}/, 'gi')
            )
        }
      ],
      [
        'confirmNewPasswordInput',
        {
          validationFn: () =>
            validateInput(
              'Please enter a password with at least 6 characters',
              new RegExp(/.{6,}/, 'gi')
            )
        }
      ]
    ]
  };

  private newPasswordInput: React.RefObject<HTMLInputElement> = createRef();
  private confirmNewPasswordInput: React.RefObject<HTMLInputElement> = createRef();

  handleFormSubmit = (formValues): void => {
    const [newPasswordInput, confirmNewPasswordInput] = formValues;
    const resetToken = getFirstQueryParamVal();

    if (newPasswordInput[1] !== confirmNewPasswordInput[1]) {
      /* TODO: handle this case */
      console.log('PASSWORD MISMATCH');
    } else {
      this.props.resetPassword(resetToken, newPasswordInput);
      this.props.history.push('/dashboard');
    }
  };

  renderAPIMsg() {
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
    } else {
      return null;
    }
  }

  legendClass = 'text-center text-2xl blue-accent';
  cardClass = 'bg-white-darkest mx-auto shadow-lg rounded-b overflow-hidden flex flex-col items-center justify-center';
  submitButtonClass = 'mx-auto my-2 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white trans-300ms-all';
  fieldsetClass = 'px-2';

  render() {
    const { waiting } = this.props;

    return (
      <main id="reset-password-wrapper">
        {!waiting ? null : <LoadingIndicator waiting={waiting} message={'One moment please.'} />}

        {this.renderAPIMsg()}

        <div id="reset-password-card" className={waiting ? 'hide' : `show ${this.cardClass}`}>
          <Form
            id="reset-password"
            fieldDefaults={this.state.fieldDefaults}
            onFormSubmit={this.handleFormSubmit}
            className="flex flex-col"
            render={({ onChange, getInputProps, getFormState, getFormProps }) => {
              return (
                <React.Fragment>
                  <fieldset className={this.fieldsetClass}>
                    <legend id="reset-password" className={this.legendClass}>
                      Reset your password
                    </legend>

                    <div className="input-wrapper">
                      <Input
                        {...getInputProps({
                          type: 'password',
                          label: 'New Password',
                          id: 'newPasswordInput'
                        })}
                      />
                    </div>

                    <div className="input-wrapper">
                      <Input
                        {...getInputProps({
                          type: 'password',
                          label: 'Confirm New Password',
                          id: 'confirmNewPasswordInput'
                        })}
                      />
                    </div>
                  </fieldset>
                  <button
                    type="submit"
                    disabled={!getFormState().allFieldsValid}
                    className={this.submitButtonClass}
                  >
                    CHANGE PASSWORD AND LOGIN
                  </button>
                </React.Fragment>
              );
            }}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  waiting: state.auth.waiting,
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default withRouter(connect(mapStateToProps, { resetPassword })(ResetPassword));
