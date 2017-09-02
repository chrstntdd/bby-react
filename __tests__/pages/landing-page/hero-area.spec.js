import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import HeroArea from '../../../src/components/pages/landing-page/hero-area.jsx';

const setup = () => {
  const context = createRouterContext();

  const props = {
    handleShowModal: jest.fn(),
    handleCreateNewTable: jest.fn(),
    selectOptionData: [
      {
        tableId: '599aec4c2ea3f20011051fe1',
        formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
      }
    ]
  };

  const enzymeWrapper = mount(
    <Router context={context}>
      <HeroArea {...props} />
    </Router>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('<HeroArea/>', () => {
  it('should render without crashing', () => {
    shallow(<HeroArea />);
  });
  it('should render the button container', () => {
    const wrapper = shallow(<HeroArea />);
    expect(wrapper.children().node.props.className).toBe('button-container');
  });
  it('should contain the tagline', () => {
    const { enzymeWrapper } = setup();
    const tagline = enzymeWrapper.find('h2');
    expect(tagline.text()).toBe(
      'A streamlined system for efficiently and accurately managing retail inventory.'
    );
  });
  it('should contain the title h1', () => {
    const { enzymeWrapper } = setup();
    const title = enzymeWrapper.find('h1');
    expect(title.props().children).toBe('Quantified');
  });
  it('should contain the hero image div', () => {
    const { enzymeWrapper } = setup();
    const heroImageDiv = enzymeWrapper.find('.hero-img');
    expect(heroImageDiv).not.toBe(null);
  });
  describe('the buttons in the container', () => {
    it('the sign up button should link to the sign UP component', () => {
      const { enzymeWrapper } = setup();
      const button = enzymeWrapper.find('#sign-up-button').props();
      expect(button.href).toBe('/sign-up');
    });
    it('the sign up button should link to the sign IN component', () => {
      const { enzymeWrapper } = setup();
      const button = enzymeWrapper.find('#sign-in-button').props();
      expect(button.href).toBe('/sign-in');
    });
    it('the sign up button should direct to the sign UP component', () => {
      const context = createRouterContext();

      const props = {};
      const instance = mount(
        <Router context={context}>
          <HeroArea {...props} />
        </Router>
      );
      const router = instance.find('Router');
      const button = instance.find('#sign-up-button');
      expect(router.props().history.location.pathname).toBe('/');
      button.simulate('click', { button: 0 });
      expect(router.props().history.location.pathname).toBe('/sign-up');
    });
    it('the sign up button should direct to the sign IN component', () => {
      const context = createRouterContext();

      const props = {};
      const instance = mount(
        <Router context={context}>
          <HeroArea {...props} />
        </Router>
      );
      const router = instance.find('Router');
      const button = instance.find('#sign-in-button');
      expect(router.props().history.location.pathname).toBe('/');
      button.simulate('click', { button: 0 });
      expect(router.props().history.location.pathname).toBe('/sign-in');
    });
  });
});
