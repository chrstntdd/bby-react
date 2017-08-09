import axios from 'axios';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
import {
  AUTH_USER,
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
  REGISTER_EMAIL_SENT,
  REGISTER_ERROR,
  SET_NEW_TABLE_ID,
  LOAD_TABLE
} from './types';
const _find = require('lodash.find');

let API_URL;
process.env.NODE_ENV === 'development'
  ? (API_URL = 'http://localhost:3000/api/v1')
  : (API_URL = 'https://aqueous-headland-43492.herokuapp.com/api/v1');

const CLIENT_ROOT_URL = 'http://localhost:4444';

// CREATE INSTANCE OF UNIVERSAL COOKIE
// COMMENT OUT TO RUN TESTS!
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
      .post(`${API_URL}/best-buy/upc`, upc, {
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

export const printTable = () => dispatch => {
  // setTimeout(() => {
  window.print();
  // }, 500);

  const beforePrint = () => {
    console.log('before print');
    return dispatch({ type: HIDE_ACTIONS });
  };

  const afterPrint = () => {
    console.log('after print');
    return dispatch({ type: SHOW_ACTIONS });
  };
  window.onbeforeprint = beforePrint;
  window.onafterprint = afterPrint;

  (() => {
    /* if chrome */
    if (window.matchMedia) {
      let mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(mql => {
        if (mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      });
    }
  })();
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
  const user = cookie.get('user', { path: '/' });
  const products = state.table.products;
  const tableId = state.table.tableId;
  axios
    .put(`${API_URL}/tables/${user.id}/${tableId}`, products, {
      headers: { Authorization: cookie.get('token') }
    })
    .then(res => {
      dispatch({ type: SYNCED_TABLE_TO_DB });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

/* Creates a new table for the user, then loads that table state into the view */
export const createNewTable = () => (dispatch, getState) => {
  const user = cookie.get('user', { path: '/' });
  axios
    .post(`${API_URL}/tables/${user.id}`)
    .then(res => {
      dispatch({ type: SET_NEW_TABLE_ID, payload: res.data._id });
    })
    .then(() => {
      /* load blank table */
      dispatch({ type: LOAD_TABLE });
    })
    .catch(err => {
      errorHandler(dispatch, err.response, AUTH_ERROR);
    });
};

/* takes in props from login form */
export const loginUser = ({ employeeNumber, password }) => dispatch => {
  axios
    .post(`${API_URL}/users/sign-in`, {
      email: `${employeeNumber}@bestbuy.com`,
      password
    })
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
  firstName,
  lastName,
  password,
  employeeNumber,
  storeNumber
}) => dispatch => {
  axios
    .post(`${API_URL}/users`, {
      firstName,
      lastName,
      password,
      employeeNumber,
      storeNumber
    })
    .then(res => {
      // TELL USER TO CHECK THEIR EMAIL
      dispatch({
        type: REGISTER_EMAIL_SENT,
        payload:
          'Registered successfully, now check your work email to verify your account'
      });
    })
    .catch(err => {
      const errorMessages = err.response.data.messages;
      dispatch({ type: REGISTER_ERROR, payload: errorMessages });
    });
};

export const logoutUser = error => dispatch => {
  dispatch({ type: UNAUTH_USER, payload: error || '' });
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });
};

export const getForgotPasswordToken = ({ email }) => dispatch => {
  axios
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
  axios
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
  axios.post(`${API_URL}/users/verify-email/${token}`).then(res => {
    if (res.status === 200) {
      cookie.set('token', res.data.token, { path: '/' });
      cookie.set('user', res.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
    } else {
      dispatch({ type: UNAUTH_USER });
    }
  });
};
