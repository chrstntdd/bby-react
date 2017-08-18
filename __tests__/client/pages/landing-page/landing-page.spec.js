import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LandingPage from '../../../../client/src/components/pages/landing-page/landing-page.jsx';

describe('<LandingPage/>', () => {
  it('should render without crashing', () => {
    shallow(<LandingPage />);
  });
});
