import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../../client/src/components/search-bar.jsx';

describe('<SearchBar/>', () => {
  it('should render without crashing', () => {
    shallow(<SearchBar />);
  });
});
