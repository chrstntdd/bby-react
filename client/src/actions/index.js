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
  INCREMENT_PRODUCT_QUANTITY,
  DECREMENT_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_TABLE,
  FORMAT_TABLE
} from './types';
const _find = require('lodash.find');

const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:4444';

// CREATE INSTANCE OF UNIVERSAL COOKIE
const cookie = new Cookies();

export const getProductDetails = upc => (dispatch, getState) => {
  const state = getState();
  const products = state.table.products;
  if (_find(products, upc) !== undefined) {
    // IF THE PRODUCT EXISTS ALREADY
    dispatch({ type: INCREMENT_PRODUCT_QUANTITY, payload: upc.upc });
  } else {
    // IF THE PRODUCT IS UNIQUE AND DOESN'T EXIST WITHIN THE ARRAY
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
  }
};

export const decrementProductQuantity = upc => dispatch => {
  dispatch({ type: DECREMENT_PRODUCT_QUANTITY, payload: upc });
};

export const removeItemFromTable = upc => dispatch => {
  dispatch({ type: REMOVE_PRODUCT_FROM_TABLE, payload: upc });
};

export const formatTable = () => dispatch => {
  dispatch({ type: FORMAT_TABLE });
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

export const resetPassword = (token, { password }) => dispatch => {
  axios
    .post(`${API_URL}/auth/reset-password/${token}`, { password })
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: res.data.message
      });
      // REDIRECT TO LOGIN PAGE WHEN SUCCESSFUL
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};
