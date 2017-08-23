import React from 'react';
import { shallow } from 'enzyme';

import { TableModal } from '../../client/src/components/table-modal.jsx';

const setup = () => {
  const props = {
    handleShowModal: jest.fm(),
    handleCreateNewTable: jest.fn(),
    selectOptionData: [
      {
        tableId: '599aec4c2ea3f20011051fe1',
        formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
      }
    ]
  };
  const enzymeWrapper = mount(<TableModal {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('<TableModal/>', () => {
  it('should render without crashing', () => {
    const selectOptionData = [
      {
        tableId: '599aec4c2ea3d20011051fe1',
        formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
      }
    ];
    shallow(<TableModal selectOptionData={selectOptionData} />);
  });
  it('should ', () => {});
});
