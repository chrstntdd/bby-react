import React from 'react';
import { shallow } from 'enzyme';

import { ForgotPassword } from './';

describe('<ForgotPassword/>', () => {
  const props = {
    handleSubmit: jest.fn()
  };
  it('should render without crashing', () => {
    const componentDidMount = ForgotPassword.prototype.componentDidMount;
    ForgotPassword.prototype.componentDidMount = jest.fn();

    const wrapper = shallow(<ForgotPassword {...props} />);

    expect(wrapper).toMatchSnapshot();

    ForgotPassword.prototype.componentDidMount = componentDidMount;
  });
});
