import React from 'react';
import { shallow } from 'enzyme';

jest.useFakeTimers();

import { maybe, Maybe } from '@/fp';

import Form from './';

describe('Form Component', () => {
  const fieldDefaultsMock = [
    [
      'employeeNumberInput',
      {
        validationFn: jest.fn()
      }
    ],
    [
      'passwordInput',
      {
        validationFn: jest.fn()
      }
    ]
  ];

  const requiredProps = {
    id: 'test',
    fieldDefaults: fieldDefaultsMock,
    onFormSubmit: jest.fn(),
    render: jest.fn()
  };

  it('should render without crashing', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    const wrapper = shallow(<Form {...requiredProps} />);

    expect(wrapper).toBeDefined();
  });

  describe('updateField method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    it('should set the current value of the input to the fieldKey in the Map in state and call validateInput', () => {
      const wrapper = shallow(<Form {...requiredProps} />);
      const validateInputMock = jest.fn();
      const fieldKey = fieldDefaultsMock[0][0];
      const mockEvent = {
        target: {
          id: fieldKey,
          value: 'asdf'
        }
      };

      (wrapper.instance() as Form).validateInput = validateInputMock;

      (wrapper.instance() as Form).updateField(mockEvent);

      expect(wrapper.state().fields.get(fieldKey).value).toBe('asdf');
      expect(validateInputMock).toHaveBeenCalledTimes(1);
      expect(validateInputMock).toHaveBeenCalledWith(fieldKey);
    });
  });

  describe('handleFormSubmit method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    describe('when all fields are valid', () => {
      it('should call the onFormSubmit prop callback and clear the form', () => {
        const onFormSubmitMock = jest.fn();
        const clearFormValuesMock = jest.fn();
        const wrapper = shallow(<Form {...requiredProps} onFormSubmit={onFormSubmitMock} />);
        const mockEvent = {
          preventDefault: jest.fn()
        };

        (wrapper.instance() as Form).clearFormValues = clearFormValuesMock;
        wrapper.update();

        wrapper.setState({
          allFieldsValid: true
        });

        (wrapper.instance() as Form).handleFormSubmit(mockEvent);

        expect(onFormSubmitMock).toHaveBeenCalledTimes(1);
        expect(onFormSubmitMock).toHaveBeenCalledWith([
          ['employeeNumberInput', ''],
          ['passwordInput', '']
        ]);
        expect(clearFormValuesMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('when all fields are not valid', () => {
      it('should do nothing', () => {
        const onFormSubmitMock = jest.fn();
        const clearFormValuesMock = jest.fn();
        const wrapper = shallow(<Form {...requiredProps} onFormSubmit={onFormSubmitMock} />);
        const mockEvent = {
          preventDefault: jest.fn()
        };

        (wrapper.instance() as Form).clearFormValues = clearFormValuesMock;
        wrapper.update();

        wrapper.setState({
          allFieldsValid: false
        });

        (wrapper.instance() as Form).handleFormSubmit(mockEvent);

        expect(onFormSubmitMock).toHaveBeenCalledTimes(0);
        expect(clearFormValuesMock).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('handleInputFocus method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    describe('when the field has not been touched', () => {
      it('should set touched to true', () => {
        const wrapper = shallow(<Form {...requiredProps} />);
        const fieldKey = fieldDefaultsMock[0][0];
        const mockEvent = {
          target: {
            id: fieldKey
          }
        };

        (wrapper.instance() as Form).handleInputFocus(mockEvent);

        expect(wrapper.state().fields.get(fieldKey).touched).toBeTruthy();
      });
    });

    describe('when the field has already been touched', () => {
      it('should do nothing', () => {
        const wrapper = shallow(<Form {...requiredProps} />);
        const initialState = wrapper.state();
        const fieldKey = fieldDefaultsMock[0][0];
        const mockEvent = {
          target: {
            id: fieldKey
          }
        };

        wrapper.setState(prevState => {
          prevState.fields.set(fieldKey, {
            ...prevState.fields.get(fieldKey),
            touched: true
          });

          return {
            fields: prevState.fields
          };
        });

        (wrapper.instance() as Form).handleInputFocus(mockEvent);

        expect(wrapper.state()).toEqual(initialState);
      });
    });
  });

  describe('clearFormValues method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    it('should do its job', () => {
      const wrapper = shallow(<Form {...requiredProps} />);
      const initialState = wrapper.state();

      wrapper.setState(prevState => {
        prevState.fieldKeys.forEach(key => {
          prevState.fields.set(key, {
            ...prevState.fields.get(key),
            value: 'duplicate',
            isValid: false,
            touched: true
          });
        });

        return {
          fields: prevState.fields
        };
      });

      (wrapper.instance() as Form).clearFormValues();

      expect(wrapper.state()).toEqual(initialState);
    });
  });

  describe('validateInput method', () => {
    let render;
    const fieldKey = fieldDefaultsMock[0][0];
    const validateWholeFormMock = jest.fn();

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    beforeEach(() => {
      validateWholeFormMock.mockClear();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    describe('when validationMsg is Just a validationMsg', () => {
      it('should set isValid to false and set the message into the state', () => {
        const mockProps = {
          ...requiredProps,
          fieldDefaults: [
            [
              requiredProps.fieldDefaults[0][0],
              { validationFn: () => jest.fn(() => maybe('ERROR')) }
            ],
            requiredProps.fieldDefaults[1]
          ]
        };

        const wrapper = shallow(<Form {...mockProps} />);

        (wrapper.instance() as Form).validateWholeForm = validateWholeFormMock;
        wrapper.update();

        (wrapper.instance() as Form).validateInput(fieldKey);

        jest.runOnlyPendingTimers();

        expect(wrapper.state().fields.get('employeeNumberInput').validationMsg).toEqual('ERROR');
        expect(wrapper.state().fields.get('employeeNumberInput').isValid).toBe(false);
        expect(validateWholeFormMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('when the field is valid', () => {
      it('should set isValid to true and clear the validationMsg', () => {
        const mockProps = {
          ...requiredProps,
          fieldDefaults: [
            [
              requiredProps.fieldDefaults[0][0],
              { validationFn: () => jest.fn(() => Maybe.nothing()) }
            ],
            requiredProps.fieldDefaults[1]
          ]
        };

        const wrapper = shallow(<Form {...mockProps} />);

        (wrapper.instance() as Form).validateWholeForm = validateWholeFormMock;
        wrapper.update();

        (wrapper.instance() as Form).validateInput(fieldKey);

        jest.runOnlyPendingTimers();

        expect(wrapper.state().fields.get('employeeNumberInput').validationMsg).toEqual('');
        expect(wrapper.state().fields.get('employeeNumberInput').isValid).toBe(true);
        expect(validateWholeFormMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('validateWholeForm method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    it('should do its job', () => {
      const wrapper = shallow(<Form {...requiredProps} />);

      wrapper.setState(prevState => {
        prevState.fieldKeys.forEach(key => {
          prevState.fields.set(key, {
            ...prevState.fields.get(key),
            value: 'validtext',
            isValid: true,
            touched: true
          });
        });

        return {
          fields: prevState.fields
        };
      });

      (wrapper.instance() as Form).validateWholeForm();

      expect(wrapper.state().allFieldsValid).toBe(true);
    });
  });

  describe('getInputProps getter', () => {
    const fieldKey = fieldDefaultsMock[0][0];
    it('should return props to be spread on a form input', () => {
      const form = new Form({ ...requiredProps });

      expect(form.getInputProps({ id: fieldKey.toString() })).toMatchSnapshot();
    });
  });

  describe('getFormState getter', () => {
    it('should return form state', () => {
      const form = new Form({ ...requiredProps });

      expect(form.getFormState()).toMatchSnapshot();
    });
  });

  describe('getStateAndHelpers getter', () => {
    it('should return an object for use in the render function', () => {
      const form = new Form({ ...requiredProps });

      expect(form.getStateAndHelpers()).toMatchSnapshot();
    });
  });
});
