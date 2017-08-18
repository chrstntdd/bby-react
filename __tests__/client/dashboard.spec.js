import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import createRouterContext from 'react-router-test-context';
import { StaticRouter } from 'react-router-dom';

import Dashboard from '../../client/src/components/dashboard.jsx';

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    shallow(<Dashboard />);
  });
});
