import React from 'react';
import { shallow } from 'enzyme';

import SelectTable from '../../client/src/components/select-table.jsx';

describe('<SelectTable/>', () => {
  it('should render without crashing', () => {
    shallow(<SelectTable />);
  });
});
