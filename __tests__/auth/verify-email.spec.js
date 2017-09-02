import React from 'react';
import { shallow } from 'enzyme';

import VerifyEmail from '../../src/components/auth/verify_email.jsx';

describe('<VerifyEmail/>', () => {
  it('should render without crashing', () => {
    shallow(<VerifyEmail />);
  });
});
