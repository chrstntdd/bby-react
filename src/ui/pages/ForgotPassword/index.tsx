import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { validateInput } from '@/util';

import { getForgotPasswordToken } from '@/state/actions';

import LoadingIndicator from '@/ui/components/Loading';
import Input from '@/ui/components/Input';

import './forgot_password.scss';

interface PForgotPassword {
  getForgotPasswordToken: (employeeNumber: string) => (dispatch: any) => Promise<void>;
  waiting: boolean;
  message: string;
  errorMessage: string;
}

interface SForgotPassword {
  employeeNumberInput: {
    isValid: boolean;
    value: string;
  };
}

export class ForgotPassword extends Component<
  PForgotPassword & RouteComponentProps<{}>,
  SForgotPassword
> {
  state = {
    employeeNumberInput: {
      isValid: false,
      value: ''
    }
  };

  employeeNumberInput: React.RefObject<HTMLInputElement> = createRef();

  handleFormSubmit = formProps => {
    this.props.getForgotPasswordToken(formProps);
  };

  handleInputChange = (inputId: string, isValid: boolean, value?: string) => {
    this.setState({
      employeeNumberInput: {
        isValid,
        value
      }
    });
  };

  /* TODO:  handle rendering API messages */
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

  render() {
    const { waiting } = this.props;

    return (
      <section id="forgot-password-wrapper">
        <LoadingIndicator waiting={waiting} message={'One moment please.'} />
        <div id="forgot-password-card" className={waiting ? 'hide' : 'show'}>
          <form aria-labelledby="forgot-password" onSubmit={this.handleFormSubmit}>
            <fieldset>
              <legend id="forgot-password">Forgot password</legend>
              <div className="input-wrapper">
                <Input
                  type="text"
                  id="employeeNumberInput"
                  label="Employee Number"
                  inputRef={this.employeeNumberInput}
                  // validationCb={this.handleInputChange}
                  // validateFn={validateInput(
                  //   'Please enter a valid employee number',
                  //   new RegExp(/^\w{1}\d+$/, 'gi')
                  // )}
                />
                <span className="focus-border" />
              </div>
              <button type="submit">Reset Password</button>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default withRouter(connect(mapStateToProps, { getForgotPasswordToken })(ForgotPassword));
