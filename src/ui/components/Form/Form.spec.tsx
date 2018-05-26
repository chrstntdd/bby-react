import React from 'react';
import { shallow } from 'enzyme';

jest.useFakeTimers();

import { maybe, Maybe } from '@/fp';

import Form from './';

const fieldDefaultsMock = [
  [
    'employeeIdInput',
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

const fieldKey = fieldDefaultsMock[0][0];
const matchKey = fieldDefaultsMock[1][0];

const requiredProps = {
  id: 'test',
  fieldDefaults: fieldDefaultsMock,
  onFormSubmit: jest.fn(),
  render: jest.fn()
};

describe('Form Component', () => {
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

    it('should set the current value of the input to the fieldKey in the Map in state', () => {
      const wrapper = shallow(<Form {...requiredProps} />);
      const validateInputMock = jest.fn();
      const mockEvent = { target: { id: fieldKey, value: 'asdf' } };

      (wrapper.instance() as Form).validateInput = validateInputMock;

      (wrapper.instance() as Form).updateField(mockEvent);

      expect(wrapper.state().fields.get(fieldKey).value).toBe('asdf');
    });

    describe('when the field being udpated should be validated', () => {
      describe('when **ONLY** a validationFn exists', () => {
        it('should call validateInput function', () => {
          const mockValidationFn = jest.fn();
          const localRequiredProps = {
            ...requiredProps,
            fieldDefaults: [
              [
                'employeeIdInput',
                {
                  validationFn: mockValidationFn
                }
              ]
            ]
          };
          const wrapper = shallow(<Form {...localRequiredProps} />);
          const validateInputMock = jest.fn();
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
        });
      });

      describe('when a validationFn and validationMsg exists and the field should match another field', () => {
        it('should call validateInput function', () => {
          const mockValidationFn = jest.fn();
          const localRequiredProps = {
            ...requiredProps,
            fieldDefaults: [
              [
                'employeeIdInput',
                {
                  validationMsg: 'error',
                  match: 'passwordInput',
                  validationFn: mockValidationFn
                }
              ]
            ]
          };
          const wrapper = shallow(<Form {...localRequiredProps} />);
          const validateInputMock = jest.fn();
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
        });
      });
    });

    describe('when the validationMsg should be cleared', () => {
      describe('when allFieldsRequired', () => {
        it('should update the state accordingly', () => {
          const localRequiredProps = {
            ...requiredProps,
            allFieldsRequired: true,
            fieldDefaults: [['employeeIdInput', {}]]
          };
          const mockEvent = { target: { id: fieldKey, value: 'asdf' } };

          const wrapper = shallow(<Form {...localRequiredProps} />);

          (wrapper.instance() as Form).updateField(mockEvent);

          expect(wrapper.state().fields.get(fieldKey).validationMsg).toBe('');
          expect(wrapper.state().fields.get(fieldKey).isValid).toBe(true);
        });
      });

      describe('when the field being udpated is required and the field is not empty', () => {
        it('should update the state accordingly', () => {
          const localRequiredProps = {
            ...requiredProps,
            fieldDefaults: [['employeeIdInput', { required: true, value: 'something' }]]
          };
          const wrapper = shallow(<Form {...localRequiredProps} />);
          const mockEvent = {
            target: {
              id: fieldKey,
              value: 'asdf'
            }
          };

          (wrapper.instance() as Form).updateField(mockEvent);

          expect(wrapper.state().fields.get(fieldKey).validationMsg).toBe('');
          expect(wrapper.state().fields.get(fieldKey).isValid).toBe(true);
        });
      });
    });

    it('should **NOT** call validateInput method if a validation function does not exist', () => {
      const mockProps = {
        ...requiredProps,
        fieldDefaults: [[fieldKey, {}], requiredProps.fieldDefaults[1]]
      };
      const wrapper = shallow(<Form {...mockProps} />);
      const validateInputMock = jest.fn();
      const mockEvent = {
        target: {
          id: fieldKey,
          value: 'asdf'
        }
      };

      (wrapper.instance() as Form).validateInput = validateInputMock;

      (wrapper.instance() as Form).updateField(mockEvent);

      expect(wrapper.state().fields.get(fieldKey).value).toBe('asdf');
      expect(validateInputMock).toHaveBeenCalledTimes(0);
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
          ['employeeIdInput', ''],
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
        const mockEvent = {
          target: {
            id: fieldKey
          }
        };

        (wrapper.instance() as Form).handleInputFocus(mockEvent);

        expect(wrapper.state().fields.get(fieldKey).hasBeenVisited).toBeTruthy();
      });
    });

    describe('when the field has already been touched', () => {
      it('should do nothing', () => {
        const wrapper = shallow(<Form {...requiredProps} />);
        const initialState = wrapper.state();
        const mockEvent = {
          target: {
            id: fieldKey
          }
        };

        wrapper.setState(prevState => {
          prevState.fields.set(fieldKey, {
            ...prevState.fields.get(fieldKey),
            hasBeenVisited: true
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

  describe('handleInputBlur method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });
    describe('when the field **DOES NOT** have a validationMsg and has a validationFn', () => {
      it('should call validateInput method', () => {
        const wrapper = shallow(<Form {...requiredProps} />);
        const mockValidateInput = jest.fn();
        const mockEvent = { target: { id: fieldKey } };

        (wrapper.instance() as Form).validateInput = mockValidateInput;
        (wrapper.instance() as Form).handleInputBlur(mockEvent);

        expect(mockValidateInput).toHaveBeenCalledTimes(1);
        expect(mockValidateInput).toHaveBeenCalledWith(fieldKey);
      });
    });

    describe('when the field **DOES NOT** have a validationMsg and **HAS** a match key', () => {
      it('should call validateInput method', () => {
        const mockProps = {
          ...requiredProps,
          fieldDefaults: [[fieldKey, { match: 'passwordInput' }]]
        };
        const wrapper = shallow(<Form {...mockProps} />);
        const mockValidateInput = jest.fn();
        const mockEvent = { target: { id: fieldKey } };

        (wrapper.instance() as Form).validateInput = mockValidateInput;
        (wrapper.instance() as Form).handleInputBlur(mockEvent);

        expect(mockValidateInput).toHaveBeenCalledTimes(1);
        expect(mockValidateInput).toHaveBeenCalledWith(fieldKey);
      });
    });

    describe('when allFieldsRequired is true', () => {
      it('should call checkRequired method', () => {
        const mockCheckRequired = jest.fn();
        const mockValidateInput = jest.fn();
        const mockEvent = { target: { id: fieldKey } };
        const mockProps = { ...requiredProps, allFieldsRequired: true };

        const wrapper = shallow(<Form {...mockProps} />);

        (wrapper.instance() as Form).validateInput = mockValidateInput;
        (wrapper.instance() as Form).checkRequired = mockCheckRequired;

        (wrapper.instance() as Form).handleInputBlur(mockEvent);

        expect(mockValidateInput).toHaveBeenCalledTimes(1);
        expect(mockValidateInput).toHaveBeenCalledWith(fieldKey);
        expect(mockCheckRequired).toHaveBeenCalledTimes(1);
        expect(mockCheckRequired).toHaveBeenCalledWith(fieldKey);
      });
    });

    describe('when the field is required and has no validator', () => {
      it('should call checkRequired method', () => {
        const mockCheckRequired = jest.fn();
        const mockValidateInput = jest.fn();
        const mockProps = {
          ...requiredProps,
          allFieldsRequired: false,
          fieldDefaults: [[fieldKey, { required: true }]]
        };
        const mockEvent = { target: { id: fieldKey } };

        const wrapper = shallow(<Form {...mockProps} />);

        (wrapper.instance() as Form).validateInput = mockValidateInput;
        (wrapper.instance() as Form).checkRequired = mockCheckRequired;

        (wrapper.instance() as Form).handleInputBlur(mockEvent);

        expect(mockCheckRequired).toHaveBeenCalledTimes(1);
        expect(mockCheckRequired).toHaveBeenCalledWith(fieldKey);
      });
    });
  });

  describe('checkRequired method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });

    describe('when allFieldsRequired', () => {
      it('should set isValid to false and add a validation message to the field', () => {
        const mockProps = { ...requiredProps, allFieldsRequired: true };

        const wrapper = shallow(<Form {...mockProps} />);

        (wrapper.instance() as Form).checkRequired(fieldKey);

        expect(wrapper.state().fields.get(fieldKey).isValid).toBe(false);
        expect(wrapper.state().fields.get(fieldKey).validationMsg).toEqual(expect.any(String));
      });
    });

    describe('when the field is required', () => {
      it('should set isValid to false and add a validation message to the field', () => {
        const mockProps = {
          ...requiredProps,
          allFieldsRequired: false,
          fieldDefaults: [[fieldKey, { required: true }]]
        };

        const wrapper = shallow(<Form {...mockProps} />);

        (wrapper.instance() as Form).checkRequired(fieldKey);

        expect(wrapper.state().fields.get(fieldKey).isValid).toBe(false);
        expect(wrapper.state().fields.get(fieldKey).validationMsg).toEqual(expect.any(String));
      });
    });

    describe('when no other condition is met', () => {
      it('should do nothing', () => {
        const mockProps = {
          ...requiredProps,
          allFieldsRequired: false,
          fieldDefaults: [[fieldKey, { value: 'sometext' }]]
        };

        const wrapper = shallow(<Form {...mockProps} />);

        const initalState = wrapper.state();

        (wrapper.instance() as Form).checkRequired(fieldKey);

        expect(initalState).toEqual(wrapper.state());
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

  describe('validateMatch method', () => {
    let render;

    beforeAll(() => {
      render = Form.prototype.render;
      Form.prototype.render = jest.fn();
    });

    afterAll(() => {
      Form.prototype.render = render;
    });

    describe('when the two fields dont match in value', () => {
      it('should return an object that would be used to set a validationMsg and make the field invalid', () => {
        const mockProps = {
          ...requiredProps,
          allFieldsRequired: false,
          fieldDefaults: [
            [fieldKey, { value: 'same', label: 'first' }],
            [matchKey, { value: 'different', label: 'second' }]
          ]
        };

        const wrapper = shallow(<Form {...mockProps} />);

        wrapper.setState(prevState => {
          prevState.fieldKeys.forEach(key => {
            prevState.fields.set(key, {
              ...prevState.fields.get(key),
              isValid: true,
              hasBeenVisited: true
            });
          });

          return {
            fields: prevState.fields
          };
        });

        const response = (wrapper.instance() as Form).validateMatch(fieldKey, matchKey);

        expect(response.isValid).toBe(false);
        expect(response.validationMsg).toEqual(expect.any(String));
      });
    });

    describe('when no other condition is met', () => {
      it('should return an object that would be used to clear a validationMsg and make the field valid', () => {
        const mockProps = {
          ...requiredProps,
          allFieldsRequired: false,
          fieldDefaults: [
            [fieldKey, { value: 'same', label: 'first' }],
            [matchKey, { value: 'same', label: 'second' }]
          ]
        };

        const wrapper = shallow(<Form {...mockProps} />);

        wrapper.setState(prevState => {
          prevState.fieldKeys.forEach(key => {
            prevState.fields.set(key, {
              ...prevState.fields.get(key),
              isValid: true,
              hasBeenVisited: true
            });
          });

          return {
            fields: prevState.fields
          };
        });

        const response = (wrapper.instance() as Form).validateMatch(fieldKey, matchKey);

        expect(response.isValid).toBe(true);
        expect(response.validationMsg).toEqual('');
      });
    });
  });

  describe('validateInput method', () => {
    let render;
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

        expect(wrapper.state().fields.get('employeeIdInput').validationMsg).toEqual('ERROR');
        expect(wrapper.state().fields.get('employeeIdInput').isValid).toBe(false);
        expect(validateWholeFormMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('when the field is valid', () => {
      describe('when the field shoud also match another field', () => {
        it('should call the validateMatch method', () => {
          const mockProps = {
            ...requiredProps,
            fieldDefaults: [
              [
                fieldKey,
                {
                  value: 'same',
                  match: 'passwordInput',
                  validationFn: () => jest.fn(() => Maybe.nothing())
                }
              ],
              [matchKey, { value: 'same' }]
            ]
          };
          const mockValidateMatch = jest.fn();

          const wrapper = shallow(<Form {...mockProps} />);

          wrapper.setState(prevState => {
            prevState.fieldKeys.forEach(key => {
              prevState.fields.set(key, {
                ...prevState.fields.get(key),
                isValid: true,
                hasBeenVisited: true
              });
            });

            return {
              fields: prevState.fields
            };
          });

          (wrapper.instance() as Form).validateMatch = mockValidateMatch;
          (wrapper.instance() as Form).validateWholeForm = validateWholeFormMock;

          wrapper.update();

          (wrapper.instance() as Form).validateInput(fieldKey);

          jest.runOnlyPendingTimers();

          // expect(wrapper.state().fields.get('employeeIdInput').validationMsg).toEqual('');
          // expect(wrapper.state().fields.get('employeeIdInput').isValid).toBe(true);
          expect(validateWholeFormMock).toHaveBeenCalledTimes(1);
          expect(mockValidateMatch).toHaveBeenCalledTimes(1);
        });
      });

      describe('when the field **DOES NOT** need to match another field', () => {
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

          expect(wrapper.state().fields.get('employeeIdInput').validationMsg).toEqual('');
          expect(wrapper.state().fields.get('employeeIdInput').isValid).toBe(true);
          expect(validateWholeFormMock).toHaveBeenCalledTimes(1);
        });
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
            hasBeenVisited: true
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
