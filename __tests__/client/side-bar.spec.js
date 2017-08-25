import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import {
  toggleShowTableModal,
  createNewTable,
  getPreviousTableData
} from '../../client/src/actions/index';
import { Provider } from 'react-redux';

import ConnectedSideBar, {
  SideBar
} from '../../client/src/components/side-bar.jsx';

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
    authenticated: true
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
  });
  it('should render all buttons', () => {
    const { props } = setup();
    const wrapper = shallow(<SideBar {...props} />);
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(5);
  });
});

describe('SMART <ConnectedSideBar/>', () => {
  it('should render', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper).not.toBe(null);
  });
  // describe('MANAGE button', () => {
  //   it('should dispatch handleShowModal', () => {
  //     const { enzymeWrapper, props } = setup();

  //     const button = enzymeWrapper.find('#manageButton');
  //     button.simulate('click');

  //     console.log(button.props().onClick);
  //     expect(props.toggleShowTableModal).toHaveBeenCalled();
  //   });
  // });
  // describe('SAVE button', () => {
  //   it('should dispatch handleSyncToDatabase', () => {
  //     const { enzymeWrapper, props } = setup();

  //     const button = enzymeWrapper.find('#saveButton');
  //     button.simulate('click');
  //     expect(props.handleSyncToDatabase).toHaveBeenCalled();
  //   });
  // });
  // describe('FORMAT button', () => {
  //   it('should dispatch toggleShowTableModal', () => {
  //     const { enzymeWrapper, props } = setup();

  //     const button = enzymeWrapper.find('#formatButton');
  //     button.simulate('click');
  //     expect(props.handleTableFormat).toHaveBeenCalled();
  //   });
  // });
  // describe('{PRINT button', () => {
  //   it('should dispatch toggleShowTableModal', () => {
  //     const { enzymeWrapper, props } = setup();

  //     const button = enzymeWrapper.find('#printButton');
  //     button.simulate('click');
  //     expect(props.handlePrintTable).toHaveBeenCalled();
  //   });
  // });
  // describe('CLEAR TABLE button', () => {
  //   it('should dispatch toggleShowTableModal', () => {
  //     const { enzymeWrapper, props } = setup();

  //     const button = enzymeWrapper.find('#clearTableButton');
  //     button.simulate('click');
  //     expect(props.handelClearTable).toHaveBeenCalled();
  //   });
  // });
});
