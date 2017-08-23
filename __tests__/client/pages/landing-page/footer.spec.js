import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../../client/src/components/pages/landing-page/footer.jsx';

describe('<Footer/>', () => {
  it('should render without crashing', () => {
    const footerData = [
      {
        name: 'Official Best Buy API Status',
        link: 'https://developer.bestbuy.com/api-status'
      },
      {
        name: 'Sign up',
        link: '/sign-up'
      },
      {
        name: 'Sign in',
        link: '/sign-in'
      }
    ];
    shallow(<Footer footerData={footerData} />);
  });
});
