import * as React from 'react';
import { shallow } from 'enzyme';

import ProductTable from './';

describe('<ProductTable/>', () => {
  it('should render without crashing', () => {
    shallow(<ProductTable />);
  });
});