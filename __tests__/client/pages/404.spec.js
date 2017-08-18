import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../../client/src/components/pages/not-found.jsx';

describe('<NotFound/>', () => {
  it('should render without crashing', () => {
    shallow(<NotFound />);
  });
});
