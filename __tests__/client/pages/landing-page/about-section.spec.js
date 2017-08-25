import React from 'react';
import { shallow } from 'enzyme';

import AboutSection from '../../../../client/src/components/pages/landing-page/about-section.jsx';

describe('<AboutSection/>', () => {
  it('should render without crashing', () => {
    shallow(<AboutSection />);
  });
});