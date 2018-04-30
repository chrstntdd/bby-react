import React, { PureComponent, createRef, Fragment } from 'react';
import { connect } from 'react-redux';

import { validateInput } from '@/util';
import { registerUser } from '@/state/actions';

import Input from '@/ui/components/Input';
import Form from '@/ui/components/Form';

interface IRegisterUser {
  firstName: string;
  lastName: string;
  password: string;
  employeeNumber: string;
  storeNumber: number;
}

interface PRegisterForm {
  id: string;
  errorMessage?: string;
  registerUser: (registerUserObj: IRegisterUser) => (dispatch: any) => Promise<void>;
}

interface SRegisterForm {}

export class RegisterForm extends PureComponent<PRegisterForm, SRegisterForm> {
  state = {
    /* TO BE USED TO CREATE AN ES6 MAP WITHIN THE FORM COMPONENT */
    fieldDefaults: [
      ['firstNameInput', {}],
      ['lastNameInput', {}],
      ['storeNumberInput', {}],
      [
        'employeeIdInput',
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
      ],
      [
        'confirmPasswordInput',
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

  private firstNameInput: React.RefObject<HTMLInputElement> = createRef();
  private lastNameInput: React.RefObject<HTMLInputElement> = createRef();
  private storeNumberInput: React.RefObject<HTMLInputElement> = createRef();
  private employeeIdInput: React.RefObject<HTMLInputElement> = createRef();
  private passwordInput: React.RefObject<HTMLInputElement> = createRef();
  private confirmPasswordInput: React.RefObject<HTMLInputElement> = createRef();

  componentDidUpdate(prevProps: PRegisterForm) {
    /* IF NEW ERROR MESSAGE CAME IN, RESET INPUT WITH FOCUS ON THE FIRST FIELD */
    /* ERROR MESSAGE IS CLEARED BEFORE EACH USER LOGIN ROUTINE */
    if (prevProps.errorMessage === '' && this.props.errorMessage) {
      this.firstNameInput.current.focus();
    }
  }

  handleFormSubmit = (formValues): void => {
    const [
      firstNameInput,
      lastNameInput,
      storeNumberInput,
      employeeIdInput,
      passwordInput,
      confirmPasswordInput
    ] = formValues;

    if (confirmPasswordInput[1] !== passwordInput[1]) {
      /* TODO: handle this case */
      console.log('PASSWORD MISMATCH');
      this.firstNameInput.current.focus();
    } else {
      const registerUserObj: IRegisterUser = {
        firstName: firstNameInput[1],
        lastName: lastNameInput[1],
        password: passwordInput[1],
        employeeNumber: employeeIdInput[1],
        storeNumber: storeNumberInput[1]
      };

      this.props.registerUser(registerUserObj);
    }
  };

  fieldsetClass = 'w-full';
  legendClass = 'text-center text-5xl blue-accent';
  submitButtonClass = 'mx-auto my-2 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white trans-300ms-all';

  render() {
    return (
      <React.Fragment>
        <Form
          id={this.props.id}
          fieldDefaults={this.state.fieldDefaults}
          onFormSubmit={this.handleFormSubmit}
          render={({ onChange, getInputProps, getFormState, getFormProps }) => {
            return (
              <Fragment>
                <fieldset>
                  <div id="register-fieldset">
                    <legend id={this.props.id} className={this.legendClass}>
                      Register here
                    </legend>
                    <div className="input-wrapper">
                      <Input
                        inputRef={this.firstNameInput}
                        {...getInputProps({
                          type: 'text',
                          label: 'First Name',
                          id: 'firstNameInput'
                        })}
                      />
                    </div>
                    <div className="input-wrapper">
                      <Input
                        inputRef={this.lastNameInput}
                        {...getInputProps({
                          type: 'text',
                          label: 'Last Name',
                          id: 'lastNameInput'
                        })}
                      />
                    </div>

                    <div className="input-wrapper">
                      <Input
                        inputRef={this.storeNumberInput}
                        {...getInputProps({
                          type: 'number',
                          label: 'Store Number',
                          id: 'storeNumberInput'
                        })}
                      />
                    </div>
                    <div className="input-wrapper">
                      <Input
                        inputRef={this.employeeIdInput}
                        {...getInputProps({
                          type: 'text',
                          label: 'Employee Number (eg: a1234567)',
                          id: 'employeeIdInput'
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
                    <div className="input-wrapper">
                      <Input
                        inputRef={this.confirmPasswordInput}
                        {...getInputProps({
                          type: 'password',
                          label: 'Confirm Password',
                          id: 'confirmPasswordInput'
                        })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!getFormState().allFieldsValid}
                      className={this.submitButtonClass}
                    >
                      Create Account
                    </button>
                  </div>
                </fieldset>
              </Fragment>
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.error
});

export default connect(mapStateToProps, {
  registerUser
})(RegisterForm);
