import React from 'react';
import { shallow } from 'enzyme';

jest.useFakeTimers();

import { SignInForm, initialState, mapStateToProps } from './';

const requiredProps = {
  id: 'unique',
  legendText: '',
  isAuthenticated: true,
  loginUser: jest.fn()
};

describe('mapStateToProps', () => {
  it('should work', () => {
    const mockReduxState = {
      auth: {
        waiting: true,
        error: ''
      }
    };
    const result = mapStateToProps(mockReduxState);

    expect(result).toEqual({
      waiting: true,
      errorMessage: ''
    });
  });
});

describe('SignInForm componnet', () => {
  describe('getDerivedStateFromProps', () => {
    let componentDidUpdate;
    let render;

    beforeAll(() => {
      componentDidUpdate = SignInForm.prototype.componentDidUpdate;
      render = SignInForm.prototype.render;
      SignInForm.prototype.componentDidUpdate = jest.fn();
      SignInForm.prototype.render = jest.fn();
    });

    afterAll(() => {
      SignInForm.prototype.componentDidUpdate = componentDidUpdate;
      SignInForm.prototype.render = render;
    });

    describe('when nextProps includes an error message', () => {
      it('should return the initial state', () => {
        const wrapper = shallow(<SignInForm />);

        wrapper.setProps({ errorMessage: 'There was an error' });

        expect(wrapper.state()).toEqual(initialState);
      });
    });
    describe('catch all case', () => {
      it('should not alter the state', () => {
        const wrapper = shallow(<SignInForm />);
        const wrapperInitialState = wrapper.state();
        wrapper.setProps({ notRelevant: 'random' });

        expect(wrapper.state()).toEqual(wrapperInitialState);
      });
    });
  });

  describe('componentDidUpdate', () => {
    let render;

    beforeAll(() => {
      render = SignInForm.prototype.render;
      SignInForm.prototype.render = jest.fn();
    });

    afterAll(() => {
      SignInForm.prototype.render = render;
    });
    it('should reset the classNames and values of the inputs and focus the employeeNumberInput', () => {
      const wrapper = shallow(<SignInForm errorMessage="" />);

      wrapper.instance().employeeNumberInput.current = {
        className: 'has-content',
        value: 'a12345',
        focus: jest.fn()
      };
      wrapper.instance().passwordInput.current = {
        className: 'has-content',
        value: 'secret',
        focus: jest.fn()
      };

      wrapper.setProps({ errorMessage: 'API failure' });

      expect(wrapper.instance().employeeNumberInput.current.className).toBe('');
      expect(wrapper.instance().passwordInput.current.className).toBe('');
      expect(wrapper.instance().employeeNumberInput.current.value).toBe('');
      expect(wrapper.instance().passwordInput.current.value).toBe('');
      expect(wrapper.instance().employeeNumberInput.current.focus).toHaveBeenCalledTimes(1);
    });
    it('should do nothing else', () => {
      const wrapper = shallow(<SignInForm />);
      wrapper.setProps({ randomMessage: 'Hey' });

      expect(wrapper).toBeDefined();
    });
  });

  describe('handleFormSubmit method', () => {
    describe('when both inputs are valid', () => {
      it('should call the loginUser routine', () => {
        const loginUserMock = jest.fn();
        const mockEvent = {
          preventDefault: jest.fn()
        };
        const signInForm = new SignInForm({
          ...requiredProps,
          loginUser: loginUserMock
        });

        signInForm.state = {
          employeeNumberInput: {
            isValid: true,
            value: 'a123456'
          },
          passwordInput: {
            isValid: true,
            value: 'F0E4C2F76C58916EC258F246851BEA091D14D4247A2FC3E18694461B1816E13B'
          }
        };

        signInForm.handleFormSubmit(mockEvent);

        expect(loginUserMock).toHaveBeenCalledTimes(1);
        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
      });
    });
    describe('when anything else', () => {
      it('should do nothing', () => {
        const loginUserMock = jest.fn();
        const mockEvent = {
          preventDefault: jest.fn()
        };
        const signInForm = new SignInForm({
          ...requiredProps,
          loginUser: loginUserMock
        });

        signInForm.state = {
          employeeNumberInput: {
            isValid: false,
            value: 'a%#</>$'
          },
          passwordInput: {
            isValid: false,
            value: 'unsecure'
          }
        };

        signInForm.handleFormSubmit(mockEvent);

        expect(loginUserMock).toHaveBeenCalledTimes(0);
        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('validateAndUpdateState method', () => {
    let render;

    beforeAll(() => {
      render = SignInForm.prototype.render;
      SignInForm.prototype.render = jest.fn();
    });

    afterAll(() => {
      SignInForm.prototype.render = render;
    });
    describe('when validationMsg is Just a msg', () => {
      it('should set a validationMsg, set isValid to false, and update the value', () => {
        const wrapper = shallow(<SignInForm {...requiredProps} />);
        const inputValue = '!@#$$#@$';

        (wrapper.instance() as SignInForm).validateAndUpdateState(
          inputValue,
          'employeeNumberInput'
        );
        jest.runOnlyPendingTimers();

        expect(wrapper.state().employeeNumberInput.validationMsg).toEqual(expect.any(String));
        expect(wrapper.state().employeeNumberInput.isValid).toBe(false);
        expect(wrapper.state().employeeNumberInput.value).toBe(inputValue);
      });
    });

    describe('when validationMsg is Nothing', () => {
      it('should set isValud to true, clear the validationMsg, and set the value', () => {
        const wrapper = shallow(<SignInForm {...requiredProps} />);
        const inputValue = '0A916B5C7E60A8B3DABFBF274B68EE038FC7886EB37892E4F5BE01E32FEE47E3';

        /* TO GET COVERAGE FOR THE OTHER INPUT */
        (wrapper.instance() as SignInForm).validateAndUpdateState(inputValue, 'passwordInput');
        jest.runOnlyPendingTimers();

        expect(wrapper.state().passwordInput.validationMsg).toEqual('');
        expect(wrapper.state().passwordInput.isValid).toBe(true);
        expect(wrapper.state().passwordInput.value).toBe(inputValue);
      });
    });
  });

  describe('updateField method', () => {
    it('should call validateAndUpdateState method with values from event', () => {
      const mockE = {
        currentTarget: {
          id: 'unique',
          value: 'something'
        }
      };
      const validateAndUpdateStateMock = jest.fn();

      const wrapper = shallow(<SignInForm />);

      (wrapper.instance() as SignInForm).validateAndUpdateState = validateAndUpdateStateMock;
      (wrapper.instance() as SignInForm).updateField(mockE);

      expect(validateAndUpdateStateMock).toHaveBeenCalledTimes(1);
      expect(validateAndUpdateStateMock).toHaveBeenCalledWith('something', 'unique');
    });
  });

  describe('renderAPIMsg method', () => {
    it('should return markup', () => {
      const wrapper = shallow(<SignInForm {...requiredProps} errorMessage="BOOM" />);

      const result = (wrapper.instance() as SignInForm).renderAPIMsg();

      expect(result).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render Input components with "has-content" class if it has a value in state', () => {
      const wrapper = shallow(<SignInForm />);

      wrapper.setState({
        employeeNumberInput: {
          value: 'something'
        },
        passwordInput: {
          value: 'else'
        }
      });

      expect(wrapper).toMatchSnapshot();
    });
  });
});
