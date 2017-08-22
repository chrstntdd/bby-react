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

export const getProductDetails = upc => (dispatch, getState) => {
  const state = getState();
  const jwt = state.auth.jwt;
  const products = state.table.products;
  if (_find(products, upc) !== undefined) {
    /* If the product upc is already in the table state, increment the quantity.
     * Dispatch is wrapped in a timeout to that ensures the proper timing of the
     * resetting on the text input.
     */
    setTimeout(() => {
      return dispatch({ type: INCREMENT_PRODUCT_QUANTITY, payload: upc.upc });
    }, 100);
  } else {
    // IF THE PRODUCT IS UNIQUE AND DOESN'T EXIST WITHIN THE ARRAY
    return axios
      .post(`${API_URL}/best-buy/upc`, upc, {
        headers: { Authorization: jwt }
      })
      .then(res => dispatch({ type: POST_UPC, payload: res.data }))
      .catch(err => {
        return dispatch({ type: INVALID_UPC, err });
        alert(err.response.data.message);
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

export const printTable = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: HIDE_ACTIONS });
  }, 10);

  setTimeout(() => {
    return window.print();
  }, 1000);

  setTimeout(() => {
    dispatch({ type: SHOW_ACTIONS });
  }, 1000);
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

export const syncToDatabase = () => (dispatch, getState) => {
  const state = getState();
  const userId = state.auth.userProfile.id;
  const jwt = state.auth.jwt;
  const products = state.table.products;
  const tableId = state.table.tableId;
  return axios
    .put(
      `${API_URL}/tables/${userId}/${tableId}`,
      { products: products },
      {
        headers: { Authorization: jwt }
      }
    )
    .then(res => {
      dispatch({ type: SYNCED_TABLE_TO_DB });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

/* Creates a new table for the user, then loads that table state into the view */
export const createNewTable = () => (dispatch, getState) => {
  const state = getState();
  const userId = state.auth.userProfile.id;
  return axios
    .post(`${API_URL}/tables/${userId}`)
    .then(res => {
      dispatch({ type: SET_NEW_TABLE_ID, payload: res.data._id });
    })
    .then(() => {
      /* load blank table into current view */
      dispatch({ type: LOAD_BLANK_TABLE });
    })
    .then(() => {
      dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

/* Makes request for all past tables, 
 * retrieving the date and the unique id of the table.
 */
export const getPreviousTableData = () => (dispatch, getState) => {
  const state = getState();
  const userId = state.auth.userProfile.id;
  return axios
    .get(`${API_URL}/tables/${userId}`)
    .then(response => {
      return response.data.map(tableInstance => {
        const tableId = tableInstance._id;
        /* date type coming from mongo */
        const createdOnMongo = tableInstance.createdOn;

        /* parse date to JS date object*/
        const parsedDate = new Date(createdOnMongo);

        /* Simpler alternative needed for IE11 */
        const formattedDate = `${parsedDate.toDateString()}-${parsedDate.toLocaleTimeString()}`;

        return {
          tableId,
          formattedDate
        };
      });
    })
    .then(tableData => {
      dispatch({ type: GET_USER_TABLE_DATA_SUCCESS, payload: tableData });
    })
    .catch(err => {
      console.error(err);
    });
};

/* loads existing table from user's collection of past tables */
export const loadTable = tableId => (dispatch, getState) => {
  const state = getState();
  const userId = state.auth.userProfile.id;
  return axios
    .get(`${API_URL}/tables/${userId}/${tableId}`)
    .then(response => {
      dispatch({ type: LOAD_SAVED_TABLE, payload: response.data.products });
    })
    .then(() => {
      dispatch({ type: SET_NEW_TABLE_ID, payload: tableId });
    })
    .then(() => {
      dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
    })
    .catch(err => {
      console.error(err);
    });
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
