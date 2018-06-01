import orderBy from 'lodash.orderby';
import shuffle from 'lodash.shuffle';
import {
  POST_UPC,
  FORMAT_TABLE,
  INCREMENT_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_TABLE,
  DECREMENT_PRODUCT_QUANTITY,
  SHOW_ACTIONS,
  HIDE_ACTIONS,
  CLEAR_TABLE,
  LOAD_SAVED_TABLE,
  TOGGLE_LOAD_TABLE_MODAL,
  GET_USER_TABLE_DATA_SUCCESS,
  SYNC_TABLE_SUCCESS,
  UNAUTH_USER,
  LOGIN_SUCCESS,
  SHUFFLE_TABLE
} from '../actions/types';

export interface IProduct {
  classId: number;
  department: string;
  departmentId: number;
  modelNumber: string;
  name: string;
  quantity: number;
  sku: number;
  totalValue: number;
  upc: 'string';
  value: number;
}

export type TableState = {
  readonly products: IProduct[];
  readonly formatted: boolean;
  readonly printing: boolean;
  readonly tableId: string;
  readonly showModal: boolean;
  readonly selectOptionData: null;
  readonly lastTimeSaved: string;
  readonly lastItemScanned: string;
};

export const initialState: TableState = {
  products: [],
  formatted: false,
  printing: false,
  tableId: '',
  showModal: false,
  selectOptionData: null,
  lastTimeSaved: '',
  lastItemScanned: ''
};

export const tableStateReducer = (state: TableState = initialState, action): TableState => {
  switch (action.type) {
    /* hack to ensure redux persist doesn't load in a previous session */

    /* SO WRITE YOUR OWN REDUX PERSIST THAT DONT BREAK IT */
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
      /* Adds a new IProduct to the top of the array.
       * Also flips 'formatted' to false
       */
      return {
        ...state,
        formatted: false,
        products: [action.payload, ...state.products],
        lastItemScanned: action.payload.upc
      };

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
        products: state.products.filter(product => product.upc !== action.payload)
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

    case SHUFFLE_TABLE:
      return {
        ...state,
        products: shuffle(state.products),
        formatted: false
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
      return initialState;

    default:
      return state;
  }
};
