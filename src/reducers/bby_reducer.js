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
  LOAD_BLANK_TABLE,
  LOAD_SAVED_TABLE,
  TOGGLE_LOAD_TABLE_MODAL,
  GET_USER_TABLE_DATA_SUCCESS,
  SYNC_TABLE_SUCCESS,
  UNAUTH_USER,
  LOGIN_SUCCESS
} from '../actions/types';
const orderBy = require('lodash.orderby');

const INITIAL_STATE = {
  products: [],
  formatted: false,
  printing: false,
  tableId: '',
  showModal: false,
  selectOptionData: null,
  lastTimeSaved: '',
  lastItemScanned: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* hack to ensure redux persist doesn't load in a previous session */
    case LOGIN_SUCCESS: {
      return {
        ...state,
        lastItemScanned: '',
        lastTimeSaved: '',
        tableId: '',
        products: []
      };
    }
    case POST_UPC:
      /* Adds a new product to the top of the array.
       * Also flips 'formatted' to false
       */
      return Object.assign({}, state, {
        ...state,
        formatted: false,
        products: [action.payload, ...state.products],
        lastItemScanned: action.payload.upc
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
        ),
        lastItemScanned: action.payload
      };
    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? {
                  ...product,
                  quantity: product.quantity > 1 ? product.quantity - 1 : 1,
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
    case SYNC_TABLE_SUCCESS:
      return {
        ...state,
        lastTimeSaved: action.payload
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
    case UNAUTH_USER:
      return {
        ...state,
        products: [],
        formatted: false,
        printing: false,
        tableId: '',
        showModal: false,
        selectOptionData: null
      };
    default:
      return state;
  }
}
