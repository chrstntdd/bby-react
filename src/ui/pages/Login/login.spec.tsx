import React from 'react';
import { shallow } from 'enzyme';

import { Login } from './';

describe('DUMB <Login/>', () => {
  it('should render without crashing', () => {
    const props = {
      handleSubmit: jest.fn()
    };
    const wrapper = shallow(<Login {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
