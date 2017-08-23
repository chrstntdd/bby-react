import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  UNAUTH_USER,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  POST_UPC,
  INCREMENT_PRODUCT_QUANTITY,
  DECREMENT_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_TABLE,
  FORMAT_TABLE,
  HIDE_ACTIONS,
  SHOW_ACTIONS,
  CLEAR_TABLE,
  SYNCED_TABLE_TO_DB,
  SET_NEW_TABLE_ID,
  LOAD_BLANK_TABLE,
  LOAD_SAVED_TABLE,
  TOGGLE_LOAD_TABLE_MODAL,
  GET_USER_TABLE_DATA_SUCCESS,
  NOT_VERIFIED_LOGIN_ERROR,
  INVALID_UPC,
  CLEAR_FLASH_MESSAGE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from './types';
const _find = require('lodash.find');

let API_URL;
process.env.NODE_ENV === 'production'
  ? (API_URL = 'https://aqueous-headland-43492.herokuapp.com/api/v1')
  : (API_URL = 'http://localhost:3000/api/v1');

const CLIENT_ROOT_URL = 'http://localhost:4444';

let timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getProductDetails = upc => async (dispatch, getState) => {
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

export const printTable = () => async dispatch => {
  try {
    await dispatch(hideActions(dispatch));
    await timeout(100);
    await window.print();
    await dispatch(showActions(dispatch));
  } catch (error) {
    console.log(error);
  }
};

export const clearTable = () => dispatch => {
  dispatch({ type: CLEAR_TABLE });
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

/* PUTs all products in the current table to the DB on a timer
 * on PUT, replace previous table state with the current table 
 * state (array)
 */

export const syncToDatabase = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const userId = state.auth.userProfile.id;
    const jwt = state.auth.jwt;
    const products = state.table.products;
    const tableId = state.table.tableId;

    const response = await axios.put(
      `${API_URL}/tables/${userId}/${tableId}`,
      { products: products },
      {
        headers: { Authorization: jwt }
      }
    );

    await dispatch({ type: SYNCED_TABLE_TO_DB });
  } catch (error) {
    console.error(error);
  }
};

/* Creates a new table for the user, then loads that table state into the view */
export const createNewTable = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const userId = state.auth.userProfile.id;

    const response = await axios.post(`${API_URL}/tables/${userId}`);

    await dispatch({ type: SET_NEW_TABLE_ID, payload: response.data._id });
    await dispatch({ type: LOAD_BLANK_TABLE });
    await dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
  } catch (error) {
    console.error(error);
  }
};

/* Makes request for all past tables, 
 * retrieving the date and the unique id of the table.
 */
export const getPreviousTableData = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const userId = state.auth.userProfile.id;

    const response = await axios.get(`${API_URL}/tables/${userId}`);
    const tableData = response.data.map(tableInstance => {
      const tableId = tableInstance._id;

      /* parse date to JS date object*/
      const parsedDate = new Date(tableInstance.createdOn);

      /* Simpler alternative needed for IE11 */
      const formattedDate = `${parsedDate.toDateString()}-${parsedDate.toLocaleTimeString()}`;

      return {
        tableId,
        formattedDate
      };
    });

    await dispatch({ type: GET_USER_TABLE_DATA_SUCCESS, payload: tableData });
  } catch (error) {
    console.error(error);
  }
};

/* loads existing table from user's collection of past tables */
export const loadTable = tableId => async (dispatch, getState) => {
  try {
    const state = getState();
    const userId = state.auth.userProfile.id;

    const response = await axios.get(`${API_URL}/tables/${userId}/${tableId}`);

    await dispatch({ type: LOAD_SAVED_TABLE, payload: response.data.products });
    await dispatch({ type: SET_NEW_TABLE_ID, payload: tableId });
    await dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
  } catch (error) {
    console.error(error);
  }
};

export const toggleShowTableModal = () => dispatch => {
  dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
};

/* takes in props from login form */
export const loginUser = ({ employeeNumber, password }) => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`${API_URL}/users/sign-in`, {
      email: `${employeeNumber.trim()}@bestbuy.com`,
      password
    })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: res.data.user,
          jwt: res.data.token
        }
      });
    })
    .catch(err => {
      let errorResponse = Object.keys(err.response.data)[0];

      switch (errorResponse) {
        case 'validationErrors':
          const validationErrors = [];
          err.response.data.validationErrors.forEach(error => {
            validationErrors.push(error.msg);
          });
          dispatch({ type: LOGIN_FAILURE, payload: validationErrors });
          setTimeout(() => {
            dispatch({ type: CLEAR_FLASH_MESSAGE });
          }, 8000);
          break;

        case 'emailMessage':
          dispatch({
            type: LOGIN_FAILURE,
            payload: err.response.data.emailMessage
          });
          setTimeout(() => {
            dispatch({ type: CLEAR_FLASH_MESSAGE });
          }, 8000);
          break;

        case 'verifyMessage':
          dispatch({
            type: NOT_VERIFIED_LOGIN_ERROR,
            payload: err.response.data.emailMessage
          });
          setTimeout(() => {
            dispatch({ type: CLEAR_FLASH_MESSAGE });
          }, 8000);
          break;

        case 'passwordMessage':
          dispatch({
            type: LOGIN_FAILURE,
            payload: err.response.data.passwordMessage
          });
          setTimeout(() => {
            dispatch({ type: CLEAR_FLASH_MESSAGE });
          }, 8000);
          break;

        default:
          dispatch({
            type: LOGIN_FAILURE,
            payload: 'IT ALL BLEW UP'
          });
          setTimeout(() => {
            dispatch({ type: CLEAR_FLASH_MESSAGE });
          }, 8000);
          break;
      }
    });
};

export const registerUser = ({
  firstName,
  lastName,
  password,
  employeeNumber,
  storeNumber
}) => dispatch => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`${API_URL}/users`, {
      firstName,
      lastName,
      password,
      employeeNumber,
      storeNumber
    })
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload:
          'Registered successfully, now check your work email to verify your account'
      });
      setTimeout(() => {
        dispatch({ type: CLEAR_FLASH_MESSAGE });
      }, 8000);
    })
    .catch(err => {
      const errorMessages = err.response.data.messages[0].msg;
      console.log(err);
      dispatch({ type: REGISTER_FAILURE, payload: errorMessages });
      setTimeout(() => {
        dispatch({ type: CLEAR_FLASH_MESSAGE });
      }, 8000);
    });
};

export const logoutUser = error => dispatch => {
  dispatch({ type: UNAUTH_USER, payload: error || '' });
};

export const getForgotPasswordToken = ({ email }) => dispatch => {
  return axios
    .post(`${API_URL}/users/forgot-password`, { email })
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
  return axios
    .post(`${API_URL}/users/reset-password/${token}`, { password })
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

export const confirmEmail = token => dispatch => {
  return axios.post(`${API_URL}/users/verify-email/${token}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: res.data.user,
          jwt: res.data.jwt
        }
      });
    } else {
      dispatch({ type: UNAUTH_USER });
    }
  });
};
