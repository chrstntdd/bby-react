import * as React from 'react';
import { shallow } from 'enzyme';

import AboutSection from './';

describe('<AboutSection/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AboutSection />);

    expect(wrapper).toMatchSnapshot();
  });
});
