import React from 'react';
import { shallow } from 'enzyme';

import HowSection from '../../../../client/src/components/pages/landing-page/how-section.jsx';

describe('<HowSection/>', () => {
  it('should render without crashing', () => {
    shallow(<HowSection />);
  });
});
