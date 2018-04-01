import React from 'react';
import { shallow } from 'enzyme';

import { Maybe } from '@/fp';

import { Input } from './';

jest.useFakeTimers();

jest.mock('@/util', () => ({
  debounce: jest.fn(fn => fn),
  noop: jest.fn()
}));

const requiredProps = {
  name: 'test',
  inputRef: null
};

describe('Input component', () => {
  describe('handleValidation method', () => {
    const mockValidationMsg = 'mock-error';
    const mockInputVal = 'something';
    let validationCbMock;

    beforeAll(() => {
      validationCbMock = jest.fn();
    });

    afterEach(() => {
      validationCbMock.mockClear();
    });

    describe('when validationMsg is Just a msg', () => {
      it('should call validationCb', () => {
        const validateFnMock = jest.fn(x => Maybe.just(mockValidationMsg));
        const wrapper = shallow(
          <Input {...requiredProps} validationCb={validationCbMock} validateFn={validateFnMock} />
        );

        (wrapper.instance() as Input).handleValidation(mockInputVal);

        jest.runOnlyPendingTimers();

        expect(validateFnMock).toHaveBeenCalledTimes(1);
        expect(validateFnMock).toHaveBeenCalledWith(mockInputVal);
        expect(validationCbMock).toHaveBeenCalledTimes(1);
        expect(validationCbMock).toHaveBeenCalledWith(requiredProps.name, false, mockInputVal);
        expect(wrapper.state()).toEqual({
          value: '',
          validationMsg: mockValidationMsg
        });
      });
    });

    describe('when validationMsg is Nothing', () => {
      it('should call validationCb', () => {
        const validateFnMock = jest.fn(x => Maybe.nothing());
        const wrapper = shallow(
          <Input {...requiredProps} validationCb={validationCbMock} validateFn={validateFnMock} />
        );

        (wrapper.instance() as Input).handleValidation(mockInputVal);

        jest.runOnlyPendingTimers();

        expect(validateFnMock).toHaveBeenCalledTimes(1);
        expect(validateFnMock).toHaveBeenCalledWith(mockInputVal);
        expect(validationCbMock).toHaveBeenCalledTimes(1);
        expect(validationCbMock).toHaveBeenCalledWith(requiredProps.name, true, mockInputVal);
        expect(wrapper.state()).toEqual({
          value: '',
          validationMsg: ''
        });
      });
    });
  });

  describe('handleChange method', () => {
    it('should set input value into the state then call handleValidation', () => {
      const handleValidationMock = jest.fn();
      const eMock = {
        currentTarget: {
          value: 'test'
        }
      };

      const wrapper = shallow(<Input {...requiredProps} />);

      (wrapper.instance() as Input).handleValidation = handleValidationMock;

      (wrapper.instance() as Input).handleChange(eMock);

      expect(handleValidationMock).toHaveBeenCalledTimes(1);
      expect(handleValidationMock).toHaveBeenCalledWith(eMock.currentTarget.value);
      expect(wrapper.state()).toEqual({
        validationMsg: '',
        value: 'test'
      });
    });
  });

  describe('render method', () => {
    describe('when the component has a validationMsg', () => {
      it('should render the component with a error message', () => {
        const wrapper = shallow(<Input {...requiredProps} />);

        wrapper.setState({ validationMsg: 'error!' });

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when the input element has a value', () => {
      it('should add "has-content" class to the input ', () => {
        const wrapper = shallow(<Input {...requiredProps} />);

        wrapper.setState({ value: 'filled with content' });

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when the component has a label', () => {
      it('should render the component with a label element', () => {
        const wrapper = shallow(<Input {...requiredProps} label="test-label" />);

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
