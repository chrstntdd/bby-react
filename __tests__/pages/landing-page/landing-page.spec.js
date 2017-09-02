import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import HeroArea from '../../../src/components/pages/landing-page/hero-area.jsx';
import HowSection from '../../../src/components/pages/landing-page/how-section.jsx';
import AboutSection from '../../../src/components/pages/landing-page/about-section.jsx';
import Footer from '../../../src/components/pages/landing-page/footer.jsx';
import LandingPage from '../../../src/components/pages/landing-page/landing-page.jsx';

const setup = () => {
  const mockStore = configureStore();
  const context = createRouterContext();
  const initialState = {
    table: {
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: [
        {
          tableId: '599aec4c2ea3f20011051fe1',
          formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
        }
      ]
    }
  };

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
  const store = mockStore(initialState);
  const enzymeWrapper = mount(
    <Router context={context}>
      <Provider store={store}>
        <LandingPage {...props} store={store} />
      </Provider>
    </Router>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('<LandingPage/>', () => {
  it('should render without crashing', () => {
    shallow(<LandingPage />);
  });
  it('should render its child components', () => {
    const wrapper = shallow(<LandingPage />);
    const children = wrapper.children().nodes.map(child => child.type);
    const expectedChildren = [HeroArea, HowSection, AboutSection, Footer];
    expect(expectedChildren).toEqual(children);
  });
  it('should have state', () => {
    const wrapper = shallow(<LandingPage />);
    const state = wrapper.state();
    expect(state).not.toBe(null);
  });
});
