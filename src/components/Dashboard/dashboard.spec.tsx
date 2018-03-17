import * as React from 'react';
import { shallow, mount } from 'enzyme';

import ConnectedDashboard, { Dashboard } from './';

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    shallow(<Dashboard />);
  });
});
