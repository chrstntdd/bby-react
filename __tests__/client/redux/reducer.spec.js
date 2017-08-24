import auth_reducer from '../../../client/src/reducers/auth_reducer';
import bby_reducer from '../../../client/src/reducers/bby_reducer';
import * as types from '../../../client/src/actions/types';

const AUTH_INITIAL_STATE = {
  userProfile: null,
  jwt: null,
  error: '',
  message: '',
  content: '',
  authenticated: false
};

const BBY_INITIAL_STATE = {
  products: [],
  formatted: false,
  printing: false,
  tableId: '',
  showModal: false,
  selectOptionData: null
};

describe('auth reducer', () => {
  it('should return the initial state if not passed in', () => {
    expect(auth_reducer(undefined, {})).toEqual(AUTH_INITIAL_STATE);
  });
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth_reducer([], {
        type: types.LOGIN_SUCCESS,
        payload: {
          user: 'mock user',
          jwt: 'mock jwt'
        }
      })
    ).toEqual({
      userProfile: 'mock user',
      jwt: 'mock jwt',
      error: '',
      message: '',
      content: '',
      authenticated: true
    });
  });
  it('should handle UNAUTH_USER', () => {
    expect(
      auth_reducer(
        {
          userProfile: 'mock user',
          jwt: 'mock jwt',
          error: '',
          message: '',
          content: '',
          authenticated: true
        },
        {
          type: types.UNAUTH_USER
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
      authenticated: false
    });
  });
  it('should handle NOT_VERIFIED_LOGIN_ERROR', () => {
    const errorMessage = "YOU'RE NOT LOGGED IN";
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.NOT_VERIFIED_LOGIN_ERROR,
          payload: errorMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: errorMessage,
      message: '',
      content: '',
      authenticated: false
    });
  });
  it('should handle LOGIN_FAILURE', () => {
    const errorMessage = 'THERE WAS A LOGIN FAILURE';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.LOGIN_FAILURE,
          payload: errorMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: errorMessage,
      message: '',
      content: '',
      authenticated: false
    });
  });
  it('should handle CLEAR_FLASH_MESSAGE', () => {
    const errorMessage = 'THERE WAS A LOGIN FAILURE';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: errorMessage,
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.CLEAR_FLASH_MESSAGE
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: '',
      content: '',
      authenticated: false
    });
  });
  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    const responseMessage = 'GO CHECK YOUR EMAIL';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.FORGOT_PASSWORD_REQUEST,
          payload: responseMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: responseMessage,
      content: '',
      authenticated: false
    });
  });
  it('should handle RESET_PASSWORD_REQUEST', () => {
    const responseMessage = 'YOU JUST MADE A REQUEST TO RESET YOUR PASSWORD';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.RESET_PASSWORD_REQUEST,
          payload: responseMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: responseMessage,
      content: '',
      authenticated: false
    });
  });
  it('should handle REGISTER_SUCCESS', () => {
    const responseMessage = 'YOU REGISTERED SUCCESSFULLY';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.REGISTER_SUCCESS,
          payload: responseMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: '',
      message: responseMessage,
      content: '',
      authenticated: false
    });
  });
  it('should handle REGISTER_FAILURE', () => {
    const errorMessage = 'THERE WAS A REGISTRATION ERROR';
    expect(
      auth_reducer(
        {
          userProfile: null,
          jwt: null,
          error: '',
          message: '',
          content: '',
          authenticated: false
        },
        {
          type: types.REGISTER_FAILURE,
          payload: errorMessage
        }
      )
    ).toEqual({
      userProfile: null,
      jwt: null,
      error: errorMessage,
      message: '',
      content: '',
      authenticated: false
    });
  });
});

describe('bby reducer', () => {
  it('should return the initial state if not passed in', () => {
    expect(bby_reducer(undefined, {})).toEqual(BBY_INITIAL_STATE);
  });
});
