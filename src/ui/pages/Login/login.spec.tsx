import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import renderer from 'react-test-renderer';

import ConnectedLogin, { Login } from './';

import { Provider } from 'react-redux';

const setup = () => {
  const mockStore = configureStore();
  const initialState = {
    auth: {
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
      isAuthenticated: false,
      waiting: false
    }
  };
  const context = createRouterContext();

  const props = {
    handleSubmit: jest.fn(),
    valid: false,
    loginInputs: [
      {
        name: 'employeeNumber',
        type: 'text',
        label: 'Employee Number'
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password'
      }
    ]
  };
  const store = mockStore(initialState);
  const enzymeWrapper = mount(
    <Router context={context}>
      <Provider store={store}>
        <ConnectedLogin {...props} store={store} />
      </Provider>
    </Router>
  );

  return {
    props,
    enzymeWrapper,
    initialState
  };
};

describe('DUMB <Login/>', () => {
  it('should render without crashing', () => {
    const props = {
      handleSubmit: jest.fn()
    };
    const wrapper = shallow(<Login {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe.skip('SMART <ConnectedLogin/>', () => {
  it('should render the connected component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).not.toBe(null);
  });

  it('should render two inputs', () => {
    const { enzymeWrapper, props } = setup();

    const inputs = enzymeWrapper.find('input');

    expect(inputs.length).toEqual(2);
  });

  it('should dispatch handleSubmit when the form is submitted', () => {
    const { enzymeWrapper, props } = setup();
    const form = enzymeWrapper.find('form');
    form.simulate('submit');

    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
