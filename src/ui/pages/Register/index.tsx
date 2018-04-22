import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { validateInput } from '@/util';
import { registerUser } from '@/state/actions';

import { Input } from '@/ui/components/Input';
import LoadingIndicator from '@/ui/components/Loading';

import './register.scss';

export class Register extends Component {
  state = {
    firstName: {
      isValid: false,
      value: ''
    },
    lastName: {
      isValid: false,
      value: ''
    },
    storeNumber: {
      isValid: false,
      value: ''
    },
    employeeNumber: {
      isValid: false,
      value: ''
    },
    password: {
      isValid: false,
      value: ''
    },
    confirmPassword: {
      isValid: false,
      value: ''
    }
  };

  private firstNameInput: React.RefObject<HTMLInputElement> = createRef();
  private lastNameInput: React.RefObject<HTMLInputElement> = createRef();
  private storeNumberInput: React.RefObject<HTMLInputElement> = createRef();
  private employeeNumberInput: React.RefObject<HTMLInputElement> = createRef();
  private passwordInput: React.RefObject<HTMLInputElement> = createRef();
  private confirmPasswordInput: React.RefObject<HTMLInputElement> = createRef();

  handleFormSubmit = e => {
    this.props.registerUser(e);
  };

  /* TODO: handle API error messages */
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
    const { handleSubmit, valid, waiting } = this.props;

    return (
      <section id="register-section">
        {/* {this.renderAlert()} */}
        <LoadingIndicator waiting={waiting} message={'Setting things up real quick. Hang tight.'} />
        <section id="register-card" className={waiting ? 'hide' : 'show'}>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Register here</legend>
              <div className="input-wrapper">
                <Input
                  type="text"
                  name="firstNameInput"
                  label="First Name"
                  inputRef={this.firstNameInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a valid employee number',
                    new RegExp(/^\w{1}\d+$/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>
              <div className="input-wrapper">
                <Input
                  type="text"
                  name="lastNameInput"
                  label="Last Name"
                  inputRef={this.lastNameInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a valid employee number',
                    new RegExp(/^\w{1}\d+$/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>

              <div className="input-wrapper">
                <Input
                  type="number"
                  name="storeNumberInput"
                  label="Store Number"
                  inputRef={this.storeNumberInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a valid employee number',
                    new RegExp(/^\w{1}\d+$/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>
              <div className="input-wrapper">
                <Input
                  type="text"
                  name="employeeNumberInput"
                  label="Employee Number (eg: a1234567)"
                  inputRef={this.employeeNumberInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a valid employee number',
                    new RegExp(/^\w{1}\d+$/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>
              <div className="input-wrapper">
                <Input
                  type="password"
                  name="passwordInput"
                  label="Password"
                  inputRef={this.passwordInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a valid employee number',
                    new RegExp(/^\w{1}\d+$/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>
              <div className="input-wrapper">
                <Input
                  type="password"
                  name="confirmPasswordInput"
                  label="Confirm Password"
                  inputRef={this.confirmPasswordInput}
                  validationCb={this.handleInputChange}
                  validateFn={validateInput(
                    'Please enter a valid employee number',
                    new RegExp(/^\w{1}\d+$/, 'gi')
                  )}
                />
                <span className="focus-border" />
              </div>

              {/* TODO: keep button disabled until form is valid */}
              <button type="submit">Sign Up</button>
            </fieldset>
          </form>
          <Link to="/sign-in">Sign In</Link>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  waiting: state.auth.waiting,
  errorMessage: state.auth.error,
  message: state.auth.message,
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { registerUser })(Register));
