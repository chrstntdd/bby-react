import React from 'react';
import { shallow } from 'enzyme';

import Logout from '../../src/components/auth/logout.jsx';

describe('<Logout/>', () => {
  it('should render without crashing', () => {
    shallow(<Logout />);
  });
});
