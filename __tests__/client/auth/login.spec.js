import React from 'react';
import { shallow } from 'enzyme';

import Login from '../../../client/src/components/auth/login.jsx';

describe('<Login/>', () => {
  it('should render without crashing', () => {
    shallow(<Login />);
  });
});
