import * as React from 'react';
import { shallow } from 'enzyme';

import Logout from './';

describe('<Logout/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Logout />);

    expect(wrapper).toMatchSnapshot();
  });
});
