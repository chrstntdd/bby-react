import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../../client/src/components/pages/landing-page/footer.jsx';

describe('<Footer/>', () => {
  it('should render without crashing', () => {
    shallow(<Footer />);
  });
});
