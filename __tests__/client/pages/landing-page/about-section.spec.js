import React from 'react';
import { shallow } from 'enzyme';

import AboutSection from '../../../../client/src/components/pages/landing-page/about-section.jsx';

describe('<AboutSection/>', () => {
  it('should render without crashing', () => {
    shallow(<AboutSection />);
  });
  it('should render the heading tags', () => {
    const wrapper = shallow(<AboutSection />);
    const children = wrapper.children().nodes;
    expect(children.length).toBe(4);
  });
});
