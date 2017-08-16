import {
  POST_UPC,
  FORMAT_TABLE,
  INCREMENT_PRODUCT_QUANTITY,
  GET_PRODUCTS_FROM_STORE,
  REMOVE_PRODUCT_FROM_TABLE,
  DECREMENT_PRODUCT_QUANTITY,
  PRINT_TABLE,
  SHOW_ACTIONS,
  HIDE_ACTIONS,
  CLEAR_TABLE,
  SET_NEW_TABLE_ID,
  SYNCED_TABLE_TO_DB,
  LOAD_BLANK_TABLE,
  LOAD_SAVED_TABLE,
  TOGGLE_LOAD_TABLE_MODAL,
  GET_USER_TABLE_DATA_SUCCESS
} from '../actions/types';
const orderBy = require('lodash.orderby');

const INITIAL_STATE = {
  products: [],
  formatted: false,
  printing: false,
  timer: null,
  tableId: '',
  showModal: false,
  selectOptionData: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_UPC:
      // ADD IN NEW PRODUCT AT THE TOP OF THE ARRAY
      return Object.assign({}, state, {
        ...state,
        products: [action.payload, ...state.products]
      });
    case INCREMENT_PRODUCT_QUANTITY:
      // INCREMENT QUANTITY AND CALCULATE NEW VALUE BASED ON UPDATED QTY
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  totalValue: Math.round((product.quantity + 1) * product.value)
                }
              : product
        )
      };
    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                  totalValue: Math.round((product.quantity - 1) * product.value)
                }
              : product
        )
      };
    case REMOVE_PRODUCT_FROM_TABLE:
      return {
        ...state,
        products: state.products.filter(
          product => product.upc !== action.payload
        )
      };
    case FORMAT_TABLE:
      return {
        ...state,
        products: orderBy(
          state.products,
          ['departmentId', 'classId', 'sku'],
          ['asc', 'asc', 'asc']
        ),
        formatted: true
      };
    case SHOW_ACTIONS:
      return {
        ...state,
        printing: false
      };
    case HIDE_ACTIONS:
      return {
        ...state,
        printing: true
      };
    case CLEAR_TABLE:
      return {
        ...state,
        products: []
      };
    case SYNCED_TABLE_TO_DB:
      return { ...state };
    case SET_NEW_TABLE_ID:
      return {
        ...state,
        tableId: action.payload
      };
    case LOAD_BLANK_TABLE:
      return {
        ...state,
        products: []
      };
    case LOAD_SAVED_TABLE:
      return {
        ...state,
        products: action.payload
      };
    case TOGGLE_LOAD_TABLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    case GET_USER_TABLE_DATA_SUCCESS:
      return {
        ...state,
        selectOptionData: action.payload
      };
    default:
      return state;
  }
}
