import React from 'react';
import { shallow } from 'enzyme';

import SideBar from '../../client/src/components/side-bar.jsx';

describe('<SideBar/>', () => {
  it('should render without crashing', () => {
    shallow(<SideBar />);
  });
});
