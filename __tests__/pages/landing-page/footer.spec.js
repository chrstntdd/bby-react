import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../src/components/pages/landing-page/footer.jsx';

describe('<Footer/>', () => {
  const props = {
    footerData: [
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
    ]
  };
  it('should render without crashing', () => {
    shallow(<Footer {...props} />);
  });
  it('should render 4 items in a list', () => {
    const wrapper = shallow(<Footer {...props} />);
    const listItems = wrapper.find('li');
    expect(listItems.length).toBe(4);
  });
});
