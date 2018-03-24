import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';

import { toggleShowTableModal } from '../../state/actions';

import ConnectedSideBar, { SideBar } from './';

jest.useFakeTimers();

const initialState = {
  auth: {
    userProfile: {
      id: '599da3d20e07e617f988d706',
      email: 'a1075394@bestbuy.com',
      firstName: 'Christian',
      lastName: 'Todd',
      role: 'Member',
      isVerified: true,
      tables: [
        '599da4290e07e617f988d707',
        '599e2b420e338b56eed5e070',
        '599e2b450e338b56eed5e071',
        '599e2b470e338b56eed5e072',
        '599e2b4a0e338b56eed5e073'
      ]
    },
    jwt: '',
    error: '',
    message: '',
    content: '',
    isAuthenticated: true
  },
  table: {
    products: [],
    formatted: false,
    printing: false,
    tableId: 'mockid',
    showModal: false,
    selectOptionData: null
  }
};

let timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const setup = () => {
  const middlewares = [thunk];
  const context = createRouterContext();
  const mockStore = configureStore(middlewares);
  const props = {
    formatTable: jest.fn(),
    printTable: jest.fn(),
    clearTable: jest.fn(),
    syncToDatabase: jest.fn(),
    toggleShowTableModal: jest.fn()
  };
  const store = mockStore(initialState);

  const enzymeWrapper = mount(
    <Router context={context}>
      <Provider store={store}>
        <ConnectedSideBar {...props} store={store} />
      </Provider>
    </Router>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('DUMB <SideBar/>', () => {
  it('should render without crashing', () => {
    const { props } = setup();
    const wrapper = shallow(<SideBar {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render all buttons', () => {
    const { props } = setup();
    const wrapper = shallow(<SideBar {...props} />);
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(4);
  });
});

describe('SMART <ConnectedSideBar/>', () => {
  it('should render', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper).not.toBe(null);
  });

  describe('SAVE button', () => {
    it('should dispatch syncToDatabase', () => {
      const { enzymeWrapper, props } = setup();

      const button = enzymeWrapper.find('#saveButton');
      button.simulate('click');

      jest.runOnlyPendingTimers();
      expect(props.syncToDatabase).toHaveBeenCalled();
    });
  });
  describe('FORMAT button', () => {
    it('should dispatch formatTable', () => {
      const { enzymeWrapper, props } = setup();

      const button = enzymeWrapper.find('#formatButton');
      button.simulate('click');
      expect(props.formatTable).toHaveBeenCalled();
    });
  });
  describe('PRINT button', () => {
    it('should dispatch printTable', () => {
      const { enzymeWrapper, props } = setup();

      const button = enzymeWrapper.find('#printButton');
      button.simulate('click');
      expect(props.printTable).toHaveBeenCalled();
    });
  });
  describe('CLEAR TABLE button', () => {
    it('should dispatch clearTable', () => {
      const { enzymeWrapper, props } = setup();

      const button = enzymeWrapper.find('#clearTableButton');
      button.simulate('click');
      expect(props.clearTable).toHaveBeenCalled();
    });
  });
});
