import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  REGISTER_EMAIL_SENT,
  REGISTER_ERROR,
  NOT_VERIFIED_LOGIN_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  userProfile: null,
  error: '',
  message: '',
  content: '',
  authenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        message: '',
        authenticated: true,
        userProfile: action.payload
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    /* TODO: PROVIDE MORE HELPFUL ERROR MESSAGES INSTEAD OF A BLANKET STATEMENT */
    case NOT_VERIFIED_LOGIN_ERROR:
      return {
        ...state,
        error: 'Please verify your account before logging in.'
      };
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, message: action.payload.message };
    case RESET_PASSWORD_REQUEST:
      return { ...state, message: action.payload.message };
    case REGISTER_EMAIL_SENT:
      return { ...state, content: action.payload };
    case REGISTER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
