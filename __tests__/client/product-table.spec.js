import React from 'react';
import { shallow } from 'enzyme';

import ProductTable from '../../client/src/components/product-table.jsx';

describe('<ProductTable/>', () => {
  it('should render without crashing', () => {
    shallow(<ProductTable />);
  });
});
