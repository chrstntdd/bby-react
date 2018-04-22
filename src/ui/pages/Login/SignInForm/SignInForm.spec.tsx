import React from 'react';
import { shallow, mount } from 'enzyme';

import { Maybe } from '@/fp';

import { SignInForm, initialState } from './';

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
  });
});
