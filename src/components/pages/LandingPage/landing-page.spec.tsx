import * as React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import HeroArea from './HeroArea';
import HowSection from './HowSection';
import AboutSection from './AboutSection';
import Footer from './Footer';
import LandingPage from './';

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
    const wrapper = shallow(<LandingPage />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should have state', () => {
    const wrapper = shallow(<LandingPage />);
    const state = wrapper.state();
    expect(state).not.toBe(null);
  });
});
