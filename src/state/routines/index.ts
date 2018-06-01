import xfetch from '@/fetch';
import { timeout } from '@/util';

import {
  CLEAR_FLASH_MESSAGE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  INCREMENT_PRODUCT_QUANTITY,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_SAVED_TABLE,
  LOAD_SAVED_TABLE_FAILURE,
  POST_UPC,
  SYNC_TABLE_FAILURE,
  SYNC_TABLE_REQUEST,
  SYNC_TABLE_SUCCESS,
  UPC
} from '../actions/types';

let API_URL: string;

process.env.NODE_ENV === 'production'
  ? /* istanbul ignore next */
    (API_URL = 'https://aqueous-headland-43492.herokuapp.com/api/v1')
  : (API_URL = 'http://localhost:3000/api/v1');

/* TODO: Create abstraction over fetch to handle all the boilerplate for mutations made to the API */
export const checkStatus = response => {
  if (response.ok) return response;
  else {
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
};

/* ======================================================================== */

export const getProductDetails = (upc: UPC) => async (dispatch, getState) => {
  const state = getState();
  const jwt = state.auth.jwt;
  const upcMatches = state.table.products.filter(p => p.upc === upc.upc);

  if (upcMatches.length > 0) {
    dispatch({ type: INCREMENT_PRODUCT_QUANTITY, payload: upc.upc });
  } else {
    try {
      const response = await xfetch(`${API_URL}/best-buy/upc`, {
        method: 'post',
        credentials: 'include',
        headers: { Authorization: jwt, 'Content-Type': 'application/json' },
        body: JSON.stringify({ upc: upc.upc })
      });

      await checkStatus(response);

      const productDetails = await response.json();

      dispatch({ type: POST_UPC, payload: productDetails });
    } catch (error) {
      /* TODO: dispatch some message to dispay a global flash message */
      process.env.NODE_ENV !== 'test' &&
        window.alert(
          "Looks like you didn't scan the right bar code. Please make sure you scan the UPC label"
        );
    }
  }
};

export const loginUser = (employeeNumber: string, password: string) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  dispatch({ type: CLEAR_FLASH_MESSAGE });

  try {
    const response = await xfetch(`${API_URL}/users/sign-in`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${employeeNumber}@bestbuy.com`,
        password
      })
    });

    await checkStatus(response);
    const { user, jwt } = await response.json();

    dispatch({ type: LOGIN_SUCCESS, payload: { user, jwt } });

    dispatch(loadTable(user.id, jwt));
  } catch (err) {
    const error = await err.response.json();
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  } finally {
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  }
};

export const registerUser = ({
  firstName,
  lastName,
  password,
  employeeNumber,
  storeNumber
}) => async dispatch => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await xfetch(`${API_URL}/users`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        employeeNumber,
        storeNumber
      })
    });

    await checkStatus(response);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: 'Registered successfully, please check your work email to verify your account'
    });
  } catch (err) {
    const error = await err.response.json();
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  } finally {
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  }
};

export const getForgotPasswordToken = (employeeNumber: string) => async dispatch => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const response = await xfetch(`${API_URL}/users/forgot-password`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ employeeNumber })
    });

    await checkStatus(response);
    const { message } = await response.json();

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: message
    });
  } catch (err) {
    const { message } = await err.response.json();
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: message
    });
  } finally {
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  }
};

export const resetPassword = (resetToken: string, newPassword: string) => async dispatch => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const response = await xfetch(`${API_URL}/users/reset-password?token=${resetToken}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });

    await checkStatus(response);
    const { message } = await response.json();

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: message });
  } catch (err) {
    const { message } = await err.response.json();
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: message });
  } finally {
    await timeout(8000);
    dispatch({ type: CLEAR_FLASH_MESSAGE });
  }
};

export const confirmEmail = (token: string) => async dispatch => {
  try {
    const response = await xfetch(`${API_URL}/users/verify-email?token=${token}`, {
      method: 'post',
      credentials: 'include'
    });

    await checkStatus(response);

    const { user, jwt } = await response.json();

    dispatch({ type: LOGIN_SUCCESS, payload: { user, jwt } });
  } catch (error) {
    /* TODO: handle errors */
  }
};

export const syncToDatabase = () => async (dispatch, getState) => {
  dispatch({ type: SYNC_TABLE_REQUEST });
  try {
    const state = getState();
    const userId = state.auth.userProfile.id;
    const jwt = state.auth.jwt;
    const products = state.table.products;

    /* Only call to save the table if there is data to save */
    if (products.length < 1) {
      dispatch({
        type: SYNC_TABLE_FAILURE,
        payload: 'There must be products in the table in order to save it.'
      });
    } else {
      const response = await xfetch(`${API_URL}/users/${userId}/table`, {
        method: 'put',
        credentials: 'include',
        headers: { Authorization: jwt, 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentTableState: products })
      });

      await checkStatus(response);

      dispatch({
        type: SYNC_TABLE_SUCCESS,
        payload: new Date().toLocaleTimeString()
      });
    }
  } catch (err) {
    const error = await err.response.json();
    dispatch({
      type: SYNC_TABLE_FAILURE,
      payload: error.message
    });
  }
};

export const loadTable = (userId: string, jwt: string) => async dispatch => {
  try {
    const response = await xfetch(`${API_URL}/users/${userId}/table`, {
      method: 'get',
      credentials: 'include',
      headers: {
        Authorization: jwt
      }
    });

    await checkStatus(response);

    const { products } = await response.json();

    dispatch({ type: LOAD_SAVED_TABLE, payload: products });
  } catch (err) {
    /* TODO: handle errors */
    const error = await err.response.json();
    dispatch({ type: LOAD_SAVED_TABLE_FAILURE, payload: error.message });
  }
};
