import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';

import { Provider } from 'react-redux';

import ConnectedSearchBar, {
  SearchBar
} from '../../client/src/components/search-bar.jsx';

const setup = tableId => {
  const mockStore = configureStore();
  const initialState = {
    table: {
      products: [],
      formatted: false,
      printing: false,
      tableId: tableId,
      showModal: false,
      selectOptionData: [
        {
          tableId: '599aec4c2ea3f20011051fe1',
          formattedDate: 'Mon Aug 21 2017-10:21:00 AM'
        }
      ],
      lastItemScanned: '123456789963'
    },
    auth: {
      waiting: false
    }
  };
  const context = createRouterContext();

  const props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    onChange: jest.fn()
  };
  const store = mockStore(initialState);
  const enzymeWrapper = mount(
    <Router context={context}>
      <Provider store={store}>
        <ConnectedSearchBar {...props} store={store} />
      </Provider>
    </Router>
  );

  return {
    props,
    enzymeWrapper,
    initialState
  };
};

describe('DUMB <SearchBar/>', () => {
  it('should render without crashing', () => {
    const props = {
      lastItemScanned: '123456789632'
    };
    shallow(<SearchBar {...props} />);
  });
});

describe('SMART <ConnectedSearchBar/>', () => {
  it('renders the connected component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).not.toBe(null);
  });
  it('should be disabled if there is no set tableID', () => {
    const { enzymeWrapper, props } = setup('');
    const input = enzymeWrapper.find('input');
    expect(input.props().disabled).toBe(true);
  });
  it('should NOT be disabled if there is a set tableID', () => {
    const { enzymeWrapper, props } = setup('1234');

    const input = enzymeWrapper.find('input');
    expect(input.props().disabled).toBe(false);
  });
  it('should render the most most recently scanned item container', () => {
    const { enzymeWrapper, props, initialState } = setup('1234');
    const lastItemScannedContainer = enzymeWrapper.find('#last-item-scanned');
    expect(lastItemScannedContainer).not.toBe(null);
  });
  it("should render the most most recently scanned item's UPC", () => {
    const { enzymeWrapper, props, initialState } = setup('1234');
    const lastItemScannedUPC = enzymeWrapper.find('#last-item-scanned .upc');
    expect(lastItemScannedUPC.text()).toEqual(
      `UPC: ${initialState.table.lastItemScanned}`
    );
  });
});
