import {
  UNAUTH_USER,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  REGISTER_ERROR,
  NOT_VERIFIED_LOGIN_ERROR,
  CLEAR_FLASH_MESSAGE,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  userProfile: null,
  jwt: null,
  error: '',
  message: '',
  content: '',
  authenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        content: '',
        error: '',
        message: '',
        authenticated: true,
        userProfile: action.payload.user,
        jwt: action.payload.jwt
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, jwt: null, userProfile: null };
    case NOT_VERIFIED_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_FLASH_MESSAGE: {
      return {
        ...state,
        error: '',
        message: '',
        content: ''
      };
    }
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, message: action.payload };
    case RESET_PASSWORD_REQUEST:
      return { ...state, message: action.payload };
    case REGISTER_SUCCESS:
      return { ...state, message: action.payload };
    case REGISTER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
