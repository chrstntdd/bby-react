import React from 'react';
import { shallow } from 'enzyme';

import TableModal from '../../client/src/components/table-modal.jsx';

describe('<TableModal/>', () => {
  it('should render without crashing', () => {
    shallow(<TableModal />);
  });
});
