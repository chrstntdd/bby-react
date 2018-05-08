import {
  CLEAR_TABLE,
  DECREMENT_PRODUCT_QUANTITY,
  FORMAT_TABLE,
  HIDE_ACTIONS,
  REMOVE_PRODUCT_FROM_TABLE,
  SHOW_ACTIONS,
  SHUFFLE_TABLE,
  TOGGLE_LOAD_TABLE_MODAL,
  UNAUTH_USER,
  UPC
} from './types';

import { timeout } from '@/util';

export const decrementProductQuantity = (upc: UPC) => dispatch => {
  dispatch({ type: DECREMENT_PRODUCT_QUANTITY, payload: upc });
};

export const removeItemFromTable = (upc: UPC) => dispatch => {
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
    hideActions()(dispatch);
    await timeout(100);
    window.print();
    showActions()(dispatch);
  } catch (error) {
    console.log(error);
  }
};

export const clearTable = () => dispatch => {
  dispatch({ type: CLEAR_TABLE });
};

export const toggleShowTableModal = () => dispatch => {
  dispatch({ type: TOGGLE_LOAD_TABLE_MODAL });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: UNAUTH_USER });
};
