import React from 'react';
import { shallow } from 'enzyme';

import ResetPassword from '../../src/components/auth/reset_password.jsx';

describe('<ResetPassword/>', () => {
  it('should render without crashing', () => {
    shallow(<ResetPassword />);
  });
});
