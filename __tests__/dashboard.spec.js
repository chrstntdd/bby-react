import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';

import ConnectedDashboard, {
  Dashboard
} from '..//src/components/dashboard.jsx';

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    shallow(<Dashboard />);
  });
});
