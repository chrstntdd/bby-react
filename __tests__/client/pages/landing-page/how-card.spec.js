import React from 'react';
import { shallow } from 'enzyme';

import HowCard from '../../../../client/src/components/pages/landing-page/how-card.jsx';

describe('<HowCard/>', () => {
  it('should render without crashing', () => {
    shallow(<HowCard />);
  });
});
