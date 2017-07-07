import axios from 'axios';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  PROTECTED_TEST,
  POST_UPC,
  CHECK_EXISTENCE
} from './types';

const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:4444';

// CREATE INSTANCE OF UNIVERSAL COOKIE
const cookie = new Cookies();

export const getProductDetails = upc => dispatch => {
  axios
    .post(`${API_URL}/protected/bby-api`, upc, {
      headers: { Authorization: cookie.get('token') }
    })
    .then(res => {
      dispatch({ type: POST_UPC, payload: res.data });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

export const errorHandler = (dispatch, error, type) => {
  console.error(`Error type: ${type}`);
  console.error(error);

  let errorMessage = error.response ? error.response.data : error;

  // NOT AUTHENTICATED ERROR
  if (error.status === 401 || error.response.status === 401) {
    errorMessage = 'You are not authorized to do this.';
    return dispatch(logoutUser(errorMessage));
  }

  dispatch({
    type,
    payload: errorMessage
  });
};

export const loginUser = ({ email, password }) => dispatch => {
  axios
    .post(`${API_URL}/auth/login`, { email, password })
    .then(res => {
      cookie.set('token', res.data.token, { path: '/' });
      cookie.set('user', res.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

export const registerUser = ({
  email,
  firstName,
  lastName,
  password
}) => dispatch => {
  axios
    .post(`${API_URL}/auth/register`, {
      email,
      firstName,
      lastName,
      password
    })
    .then(res => {
      cookie.set('token', res.data.token, { path: '/' });
      cookie.set('token', res.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

export const logoutUser = error => dispatch => {
  dispatch({ type: UNAUTH_USER, payload: error || '' });
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });
};

export const getForgotPasswordToken = ({ email }) => dispatch => {
  axios
    .post(`${API_URL}/auth/forgot-password`, { email })
    .then(res => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: res.data.message
      });
      // REDIRECT TO LOGIN PAGE ON SUCCESSFUL PASSWORD RESET
      // SOMEWHERE HERE
    })
    .catch(err => {
      errorHandler(dispatch, errorHandler.response, AUTH_ERROR);
    });
};

export const protectedTest = () => dispatch => {
  axios
    .get(`${API_URL}/protected`, {
      headers: { Authorization: cookie.get('token') }
    })
    .then(res => {
      dispatch({
        type: PROTECTED_TEST,
        payload: res.data.content
      });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};
