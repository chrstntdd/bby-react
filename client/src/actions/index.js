import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST } from './types.js';

const API_URL = 'http://localhost:27017/api';

export const errorHandler = (dispatch, error, type) => {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if ((error.status = 401)) {
    dispatch({
      type: type,
      payload: 'YOU CANT DO THIS. LOGIN.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
};

export const loginUser = ({ email, password }) => dispatch => {
  axios
    .post(`${API_URL}/auth/login`, {
      email,
      password
    })
    .then(res => {
      cookie.save('token', res.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
    })
    .catch(err => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
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
      cookie.save('token', res.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
    })
    .catch(err => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: UNAUTH_USER });
  cookie.remove('token', { path: '/' });
  window.location.href = `${CLIENT_ROOT_URL}/login`;
};

export const protectedTest = () => dispatch => {
  axios
    .get(`${API_URL}/protected`, {
      headers: { Authorization: cookie.load('token') }
    })
    .then(res => {
      dispatch({
        type: PROTECTED_TEST,
        payload: res.data.content
      });
    })
    .catch(err => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};
