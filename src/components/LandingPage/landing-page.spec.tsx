import * as React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './';

describe('<LandingPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LandingPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
