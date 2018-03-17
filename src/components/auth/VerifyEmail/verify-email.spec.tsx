import * as React from 'react';
import { shallow } from 'enzyme';

import VerifyEmail from './';

describe('<VerifyEmail/>', () => {
  it('should render without crashing', () => {
    shallow(<VerifyEmail />);
  });
});
