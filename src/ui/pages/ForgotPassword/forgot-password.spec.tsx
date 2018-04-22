import React from 'react';
import { shallow } from 'enzyme';

import { ForgotPassword } from './';

describe('DUMB <ForgotPassword/>', () => {
  const props = {
    handleSubmit: jest.fn()
  };
  it('should render without crashing', () => {
    const wrapper = shallow(<ForgotPassword {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
