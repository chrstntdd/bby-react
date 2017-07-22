import React from 'react';
import { shallow } from 'enzyme';
import Cookies from 'universal-cookie';

import App from '../../client/src/components/app.jsx';

describe('<App/>', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });
});
