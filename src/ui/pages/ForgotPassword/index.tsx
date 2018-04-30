import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { validateInput } from '@/util';

import { getForgotPasswordToken } from '@/state/actions';

import Form from '@/ui/components/Form';
import Input from '@/ui/components/Input';
import LoadingIndicator from '@/ui/components/Loading';

import './forgot_password.scss';

interface PForgotPassword {
  getForgotPasswordToken: (employeeNumber: string) => (dispatch: any) => Promise<void>;
  waiting: boolean;
  message: string;
  errorMessage: string;
}

interface SForgotPassword {}

export class ForgotPassword extends Component<PForgotPassword, SForgotPassword> {
  state = {
    fieldDefaults: [
      [
        'employeeIdInput',
        {
          validationFn: () =>
            validateInput('Please enter a valid employee number', new RegExp(/^\w{1}\d+$/, 'gi'))
        }
      ]
    ]
  };

  employeeIdInput: React.RefObject<HTMLInputElement> = createRef();

  componentDidMount() {
    this.employeeIdInput.current.focus();
  }

  handleFormSubmit = (formValues: string[][]): void => {
    const [employeeIdInput] = formValues;

    this.props.getForgotPasswordToken(employeeIdInput[1]);
  };

  renderAPIMsg(): JSX.Element {
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
    }
    return null;
  }

  legendClass = 'text-center text-3xl blue-accent mb-6';
  fieldsetClass = 'w-full';
  cardClass = 'bg-white-darkest mx-auto shadow-lg rounded-b';
  submitButtonClass = 'mx-auto my-2 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white trans-300ms-all';

  render() {
    const { waiting, errorMessage, message } = this.props;

    return (
      <section id="forgot-password-wrapper">
        <LoadingIndicator waiting={waiting} message={'One moment please.'} />
        {errorMessage || message ? this.renderAPIMsg() : null}
        <div id="forgot-password-card" className={waiting ? 'hide' : `show ${this.cardClass}`}>
          <Form
            id="forgot-password"
            fieldDefaults={this.state.fieldDefaults}
            onFormSubmit={this.handleFormSubmit}
            render={({ onChange, getInputProps, getFormState }) => {
              return (
                <React.Fragment>
                  <fieldset className={this.fieldsetClass}>
                    <legend id="forgot-password" className={this.legendClass}>
                      Forgot Password
                    </legend>
                    <div className="input-wrapper">
                      <Input
                        inputRef={this.employeeIdInput}
                        {...getInputProps({
                          type: 'text',
                          label: 'Employee ID',
                          id: 'employeeIdInput'
                        })}
                      />
                    </div>
                  </fieldset>
                  <button
                    type="submit"
                    disabled={!getFormState().allFieldsValid}
                    className={this.submitButtonClass}
                  >
                    Begin password reset
                  </button>
                </React.Fragment>
              );
            }}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default connect(mapStateToProps, { getForgotPasswordToken })(ForgotPassword);
