import React from 'react';
import { shallow } from 'enzyme';

import HeroArea from '../../../../client/src/components/pages/landing-page/hero-area.jsx';

describe('<HeroArea/>', () => {
  it('should render without crashing', () => {
    shallow(<HeroArea />);
  });
});
