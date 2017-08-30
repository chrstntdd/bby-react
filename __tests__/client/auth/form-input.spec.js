import React from 'react';
import { shallow } from 'enzyme';

import FormInput from '../../../client/src/components/auth/form-input.jsx';

describe('<FormInput/>', () => {
  const props = {
    name: 'employeeNumber',
    type: 'text',
    label: 'Employee Number'
  };
  it('should render without crashing', () => {
    shallow(<FormInput />);
  });
  it('should render the Field based on its props', () => {
    const wrapper = shallow(<FormInput {...props} />);
    const input = wrapper.find('Field');
    expect(input.props().name).toEqual(props.name);
    expect(input.props().type).toEqual(props.type);
    expect(input.props().component).not.toBe(null);
    expect(input.props().validate).not.toBe(null);
  });
  it('should render the label based on props', () => {
    const wrapper = shallow(<FormInput {...props} />);
    const label = wrapper.props().children[1];
    expect(label.props.className).toEqual('register-label');
    expect(label.props.htmlFor).toEqual(props.name);
    expect(label.props.children).toEqual(props.label);
  });
});
