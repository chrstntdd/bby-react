import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';

import { Provider } from 'react-redux';

import ConnectedForgotPassword, {
  ForgotPassword
} from '../../src/components/auth/forgot_password.jsx';

const setup = tableId => {
  const mockStore = configureStore();
  const initialState = {
    auth: {
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
      authenticated: false,
      waiting: false
    }
  };
  const context = createRouterContext();

  const props = {
    handleSubmit: jest.fn()
  };
  const store = mockStore(initialState);
  const enzymeWrapper = mount(
    <Router context={context}>
      <Provider store={store}>
        <ConnectedForgotPassword {...props} store={store} />
      </Provider>
    </Router>
  );

  return {
    props,
    enzymeWrapper,
    initialState
  };
};

describe('DUMB <ForgotPassword/>', () => {
  const props = {
    handleSubmit: jest.fn()
  };
  it('should render without crashing', () => {
    shallow(<ForgotPassword {...props} />);
  });
});

describe('SMART <ConnectedForgotPassword/>', () => {
  it('renders the connected component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).not.toBe(null);
  });
  it('should dispatch handleSubmit when the form is submitted', () => {
    const { enzymeWrapper, props } = setup();

    const form = enzymeWrapper.find('form');
    form.simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
