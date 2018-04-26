import React, { PureComponent, createRef, Fragment } from 'react';
import { connect } from 'react-redux';

import { validateInput } from '@/util';
import { loginUser } from '@/state/actions';

import Input from '@/ui/components/Input';
import Form from '@/ui/components/Form';

interface PSignInForm {
  loginUser: (employeeNumber: string, password: string) => (dispatch: any) => Promise<void>;
  id: string;
  waiting?: boolean;
  errorMessage?: string;
}

interface SSignInForm {}

export class SignInForm extends PureComponent<PSignInForm, SSignInForm> {
  state = {
    /* TO BE USED TO CREATE AN ES6 MAP WITHIN THE FORM COMPONENT */
    fieldDefaults: [
      [
        'employeeNumberInput',
        {
          validationFn: () =>
            validateInput('Please enter a valid employee number', new RegExp(/^\w{1}\d+$/, 'gi'))
        }
      ],
      [
        'passwordInput',
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

  employeeNumberInput: React.RefObject<HTMLInputElement> = createRef();
  passwordInput: React.RefObject<HTMLInputElement> = createRef();

  componentDidUpdate(prevProps: PSignInForm) {
    /* IF NEW ERROR MESSAGE CAME IN, RESET INPUT WITH FOCUS ON THE FIRST FIELD */
    /* ERROR MESSAGE IS CLEARED BEFORE EACH USER LOGIN ROUTINE */
    if (prevProps.errorMessage === '' && this.props.errorMessage) {
      this.employeeNumberInput.current.focus();
    }
  }

  handleFormSubmit = (formValues): void => {
    const [employeeNumberInput, passwordInput] = formValues;

    this.props.loginUser(employeeNumberInput[1], passwordInput[1]);
  };

  renderAPIMsg(): JSX.Element {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  fieldsetClass = 'flex flex-col items-center w-5/6';
  legendClass = 'text-center text-2xl mx-auto m-6 blue-accent';
  submitButtonClass = 'mx-auto my-2 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white trans-300ms-all';
  formClass = 'w-full flex flex-col items-center';

  render() {
    return (
      <React.Fragment>
        {this.props.errorMessage ? this.renderAPIMsg() : null}
        <Form
          id={this.props.id}
          fieldDefaults={this.state.fieldDefaults}
          onFormSubmit={this.handleFormSubmit}
          className={this.formClass}
          render={({ onChange, getInputProps, getFormState, getFormProps }) => {
            return (
              <Fragment>
                <fieldset className={this.fieldsetClass}>
                  <legend id={this.props.id} className={this.legendClass}>
                    Login to Your Account
                  </legend>
                  <div className="input-wrapper">
                    <Input
                      inputRef={this.employeeNumberInput}
                      {...getInputProps({
                        type: 'text',
                        label: 'Employee Number',
                        id: 'employeeNumberInput'
                      })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <Input
                      inputRef={this.passwordInput}
                      {...getInputProps({
                        type: 'password',
                        label: 'Password',
                        id: 'passwordInput'
                      })}
                    />
                  </div>
                </fieldset>
                <button
                  type="submit"
                  disabled={!getFormState().allFieldsValid}
                  className={this.submitButtonClass}
                >
                  LOGIN
                </button>
              </Fragment>
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ auth }) => ({
  waiting: auth.waiting,
  errorMessage: auth.error
});

export default connect(mapStateToProps, {
  loginUser
})(SignInForm);
