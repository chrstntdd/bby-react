import React from 'react';
import { shallow } from 'enzyme';

import Main from '../../client/src/components/main.jsx';

describe('<App/>', () => {
  it('should render without crashing', () => {
    shallow(<Main />);
  });
  it('should render the main element for wrapping the entire app', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.children().length).toEqual(1);
  });
});
