import * as React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';

import HeroArea from './';

describe('<HeroArea/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HeroArea />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should contain the hero image div', () => {
    const wrapper = shallow(<HeroArea />);
    const heroImageDiv = wrapper.find('.hero-img');
    expect(heroImageDiv).not.toBe(null);
  });
});
