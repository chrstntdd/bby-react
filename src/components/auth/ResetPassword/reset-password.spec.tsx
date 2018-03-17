import * as React from 'react';
import { shallow } from 'enzyme';

import ResetPassword from './;

describe('<ResetPassword/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ResetPassword />);

    expect(wrapper).toMatchSnapshot();
  });
});
