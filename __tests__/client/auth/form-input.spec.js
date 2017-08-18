import React from 'react';
import { shallow } from 'enzyme';

import FormInput from '../../../client/src/components/auth/form-input.jsx';

describe('<FormInput/>', () => {
  it('should render without crashing', () => {
    shallow(<FormInput />);
  });
});
