import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import ConnectedSelectTable, {
  SelectTable
} from '../src/components/select-table.jsx';

const props = {
  userTables: [
    {
      tableId: '599da4290e07e617f988d707',
      formattedDate: 'Wed Aug 23 2017-11:50:01 AM'
    },
    {
      tableId: '599e2b420e338b56eed5e070',
      formattedDate: 'Wed Aug 23 2017-9:26:26 PM'
    },
    {
      tableId: '599e2b450e338b56eed5e071',
      formattedDate: 'Wed Aug 23 2017-9:26:29 PM'
    },
    {
      tableId: '599e2b470e338b56eed5e072',
      formattedDate: 'Wed Aug 23 2017-9:26:31 PM'
    },
    {
      tableId: '599e2b4a0e338b56eed5e073',
      formattedDate: 'Wed Aug 23 2017-9:26:34 PM'
    }
  ]
};

describe('DUMB <SelectTable/>', () => {
  it('should render without crashing', () => {
    shallow(<SelectTable {...props} />);
  });
  it('should render options', () => {
    const wrapper = shallow(<SelectTable {...props} />);
    const options = wrapper.find('option');
    expect(options.length).toBeGreaterThan(0);
  });
});
