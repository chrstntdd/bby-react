import React from 'react';
import { shallow } from 'enzyme';

import DashboardHeader from '../../client/src/components/dashboard-header.jsx';

describe('<DashboardHeader/>', () => {
  it('should render without crashing', () => {
    shallow(<DashboardHeader />);
  });
});
