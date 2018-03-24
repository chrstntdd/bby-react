import React from 'react';
import { shallow } from 'enzyme';

import VerifyEmail from './';

describe('<VerifyEmail/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<VerifyEmail />);

    expect(wrapper).toMatchSnapshot();
  });
});
