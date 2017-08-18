import React from 'react';
import { shallow } from 'enzyme';

import ForgotPassword from '../../../client/src/components/auth/forgot_password.jsx';

describe('<ForgotPassword/>', () => {
  it('should render without crashing', () => {
    shallow(<ForgotPassword />);
  });
});
