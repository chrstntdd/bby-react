import { browserHistory } from 'react-router-dom';
import axios from 'axios';

import {
  CLEAR_FLASH_MESSAGE,
  CLEAR_TABLE,
  DECREMENT_PRODUCT_QUANTITY,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORMAT_TABLE,
  HIDE_ACTIONS,
  INCREMENT_PRODUCT_QUANTITY,
  INVALID_UPC,
  LOAD_SAVED_TABLE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NOT_VERIFIED_LOGIN_ERROR,
  POST_UPC,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REMOVE_PRODUCT_FROM_TABLE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SHOW_ACTIONS,
  SHUFFLE_TABLE,
  SYNC_TABLE_FAILURE,
  SYNC_TABLE_REQUEST,
  SYNC_TABLE_SUCCESS,
  TOGGLE_LOAD_TABLE_MODAL,
  UNAUTH_USER
} from './types';

const _find = require('lodash.find');

let API_URL: string;
process.env.NODE_ENV === 'production'
  ? (API_URL = 'https://aqueous-headland-43492.herokuapp.com/api/v1')
  : (API_URL = 'http://localhost:3000/api/v1');

const CLIENT_ROOT_URL = 'http://localhost:4444';

let timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface UPC {
  upc: string;
}

export const getProductDetails = (upc: UPC) => async (dispatch, getState) => {
  const state = getState();
  const jwt = state.auth.jwt;
  const products = state.table.products;
  if (_find(products, upc) !== undefined) {
    /* If the product upc is already in the table state, increment the quantity.
     * Dispatch is wrapped in a timeout to that ensures the proper timing of the
     * resetting on the text input.
     */
    await timeout(100);
    await dispatch({ type: INCREMENT_PRODUCT_QUANTITY, payload: upc.upc });
  } else {
    // IF THE PRODUCT IS UNIQUE AND DOESN'T EXIST WITHIN THE ARRAY
    try {
      let response;
      response = await axios.post(`${API_URL}/best-buy/upc`, upc, {
        headers: { Authorization: jwt }
      });
      await dispatch({ type: POST_UPC, payload: response.data });
    } catch (error) {
      await dispatch({ type: INVALID_UPC });

      process.env.NODE_ENV !== 'test' &&
        window.alert(
          "Looks like you didn't scan the right bar code. Please make sure you scan the UPC label"
        );
    }
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

export const hideActions = () => async dispatch => {
  await timeout(10);
  dispatch({ type: HIDE_ACTIONS });
};

export const showActions = () => async dispatch => {
  await timeout(1000);
  dispatch({ type: SHOW_ACTIONS });
};

export const shuffleTable = () => dispatch => {
  dispatch({ type: SHUFFLE_TABLE });
};

export const printTable = () => async dispatch => {
  try {
    dispatch(hideActions()(dispatch));
    await timeout(100);
    window.print();
    dispatch(showActions()(dispatch));
  } catch (error) {
    console.log(error);
  }
};

export const clearTable = () => dispatch => {
  dispatch({ type: CLEAR_TABLE });
};

/* PUTs all products in the current table to the DB on a timer
 * on PUT, replace previous table state with the current table 
 * state (array)
 */

export const syncToDatabase = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SYNC_TABLE_REQUEST
    });
    const state = getState();
    const userId = state.auth.userProfile.id;
    const jwt = state.auth.jwt;
    const products = state.table.products;

    /* Only call to save the table if there is data to save */
    if (products.length > 0) {
      const response = await axios.put(
        `${API_URL}/users/${userId}/table`,
        { currentTableState: products },
        {
          headers: { Authorization: jwt }
        }
      );
      dispatch({
        type: SYNC_TABLE_SUCCESS,
        payload: new Date().toLocaleTimeString()
      });
    } else {
      dispatch({
        type: SYNC_TABLE_FAILURE,
        payload: 'There must be products in the table in order to save it.'
      });
    }
  } catch (error) {
    dispatch({
      type: SYNC_TABLE_FAILURE,
      payload: error
    });
  }
};

/* loads existing table from user's collection of past tables */
export const loadTable = (user, jwt) => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}/users/${user.id}/table`, {
      headers: { Authorization: jwt }
    });

    await dispatch({ type: LOAD_SAVED_TABLE, payload: response.data.products });
  } catch (error) {
    // console.log(error);
  }
};

export const toggleShowTableModal = () => dispatch => {
  dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
};

/* takes in props from login form */
export const loginUser = ({ employeeNumber, password }) => async dispatch => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await axios.post(`${API_URL}/users/sign-in`, {
      email: `${employeeNumber.trim()}@bestbuy.com`,
      password: password.trim()
    });

    const { user, jwt } = response.data;

    dispatch({ type: LOGIN_SUCCESS, payload: { user, jwt } });
    dispatch(loadTable(user, jwt));
  } catch (err) {
    let errorResponse = Object.keys(err.response.data)[0];

    switch (errorResponse) {
      case 'validationErrors':
        const validationErrors = [];
        err.response.data.validationErrors.forEach(error => {
          validationErrors.push(error.msg);
        });
        dispatch({ type: LOGIN_FAILURE, payload: validationErrors });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });

        break;

      case 'emailMessage':
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.response.data.emailMessage
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });

        break;

      case 'verifyMessage':
        dispatch({
          type: NOT_VERIFIED_LOGIN_ERROR,
          payload: err.response.data.verifyMessage
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });

        break;

      case 'passwordMessage':
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.response.data.passwordMessage
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });
        break;

      default:
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'An unknown error occurred.'
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });

        break;
    }
  }
};

export const registerUser = ({
  firstName,
  lastName,
  password,
  employeeNumber,
  storeNumber
}) => async dispatch => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    await axios.post(`${API_URL}/users`, {
      firstName,
      lastName,
      password,
      employeeNumber,
      storeNumber
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: 'Registered successfully, please check your work email to verify your account'
    });
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  } catch (error) {
    const errorResponse = Object.keys(error.response.data)[0];
    switch (errorResponse) {
      /* conflict error */
      case 'message':
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.response.data.message
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });
        break;
      /* validation error */
      case 'messages':
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.response.data.messages[0].msg
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });
        break;
      default:
        dispatch({
          type: REGISTER_FAILURE,
          payload: 'An unknown error occurred.'
        });
        await timeout(8000);
        dispatch({ type: CLEAR_FLASH_MESSAGE });
        break;
    }
  }
};

export const logoutUser = error => dispatch => {
  dispatch({ type: UNAUTH_USER, payload: error || '' });
};

export const getForgotPasswordToken = ({ employeeNumber }) => async dispatch => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const response = await axios.post(`${API_URL}/users/forgot-password`, {
      employeeNumber
    });
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: response.data.message
    });
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response.data.error
    });
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  }
};

export const resetPassword = (resetToken, { password }) => async dispatch => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const response = await axios.post(`${API_URL}/users/reset-password?token=${resetToken}`, {
      password
    });

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: response.data.message
    });
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response.data.error
    });
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  }
};

export const confirmEmail = token => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/users/verify-email?token=${token}`);
    const { user, jwt } = response.data;
    dispatch({ type: LOGIN_SUCCESS, payload: { user, jwt } });
  } catch (error) {
    console.error(error);
  }
};
