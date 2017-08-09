import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  REGISTER_EMAIL_SENT,
  REGISTER_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  content: '',
  authenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
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
