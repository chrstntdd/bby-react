import {
  UNAUTH_USER,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  NOT_VERIFIED_LOGIN_ERROR,
  CLEAR_FLASH_MESSAGE,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SYNC_TABLE_REQUEST,
  SYNC_TABLE_SUCCESS,
  SYNC_TABLE_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  userProfile: null,
  jwt: null,
  error: '',
  message: '',
  content: '',
  isAuthenticated: false,
  waiting: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        content: '',
        error: '',
        message: '',
        isAuthenticated: true,
        userProfile: action.payload.user,
        jwt: action.payload.jwt,
        waiting: false
      };
    case UNAUTH_USER:
      return { ...state, isAuthenticated: false, jwt: null, userProfile: null };
    case NOT_VERIFIED_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        waiting: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        waiting: false
      };
    case CLEAR_FLASH_MESSAGE: {
      return {
        ...state,
        error: '',
        message: '',
        content: '',
        waiting: false
      };
    }
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, waiting: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, message: action.payload, waiting: false };
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, error: action.payload, waiting: false };
    case RESET_PASSWORD_REQUEST:
      return { ...state, waiting: true };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, message: action.payload, waiting: false };
    case RESET_PASSWORD_FAILURE:
      return { ...state, error: action.payload, waiting: false };
    case REGISTER_SUCCESS:
      return { ...state, message: action.payload, waiting: false };
    case REGISTER_FAILURE:
      return { ...state, error: action.payload, waiting: false };
    case SYNC_TABLE_SUCCESS:
    case SYNC_TABLE_FAILURE:
      return {
        ...state,
        waiting: false
      };
    case SYNC_TABLE_REQUEST:
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, waiting: true };
    default:
      return state;
  }
}
