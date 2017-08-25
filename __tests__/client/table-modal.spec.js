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

import ConnectedTableModal, {
  TableModal
} from '../../client/src/components/table-modal.jsx';

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
const mockStore = configureStore();

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
  const store = mockStore(initialState);
  const enzymeWrapper = mount(
    <Router context={context}>
      <Provider store={store}>
        <ConnectedTableModal {...props} store={store} />
      </Provider>
    </Router>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('DUMB <TableModal/>', () => {
  let wrapper;
  const selectOptionData = [
    {
      tableId: '599aec4c2ea3d20011051fe1',
      formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<TableModal selectOptionData={selectOptionData} />);
  });
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should pass props to SelectTable', () => {
    expect(
      wrapper.find('.selectWrapper').props().children[1].props.userTables
    ).toEqual(selectOptionData);
  });
});

describe('SMART <ConnectedTableModal/>', () => {
  const initialState = {
    table: {
      products: [],
      formatted: false,
      printing: false,
      tableId: '',
      showModal: false,
      selectOptionData: [
        {
          tableId: '599aec4c2ea3d20011051fe1',
          formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
        }
      ]
    }
  };

  const mockStore = configureStore();
  const dispatch = jest.fn();
  let store, container;

  beforeEach(() => {
    (store = mockStore(initialState)), (container = shallow(
      <ConnectedTableModal dispatch={dispatch} store={store} />
    ));
  });
  it('should render the connected TableModal', () => {
    expect(container.length).toEqual(1);
  });
});
