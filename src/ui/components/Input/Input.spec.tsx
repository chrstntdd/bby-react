import React from 'react';
import { shallow } from 'enzyme';

import Input from './';

const requiredProps = {
  label: 'test',
  id: '1234',
  inputRef: null,
  validationMsg: ''
};

describe('Input component', () => {
  it('should render', () => {
    const wrapper = shallow(<Input {...requiredProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange prop callback if provided', () => {
    const onChangeMock = jest.fn();
    const mockEvent = { target: { value: 'test string' } };
    const wrapper = shallow(<Input {...requiredProps} onChange={onChangeMock} />);

    wrapper.find('input').simulate('change', mockEvent);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(mockEvent);
  });
});
