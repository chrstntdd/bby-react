import {
  POST_UPC,
  FORMAT_TABLE,
  INCREMENT_PRODUCT_QUANTITY,
  GET_PRODUCTS_FROM_STORE,
  REMOVE_PRODUCT_FROM_TABLE,
  DECREMENT_PRODUCT_QUANTITY
} from '../actions/types';

const INITIAL_STATE = {
  // FOR TESTING
  products: [
    {
      name: 'Apple - Apple Pencil for iPad Pro - White',
      sku: 4538802,
      upc: '888462313674',
      department: 'COMPUTERS',
      departmentId: 6,
      modelNumber: 'MK0C2AM/A',
      classId: 492,
      quantity: 5
    },
    {
      name: 'Apple - TEST TEST TEST',
      sku: 9234812,
      upc: '719284372618',
      department: 'APPLIANCES',
      departmentId: 7,
      modelNumber: 'T3ST071/B',
      classId: 420,
      quantity: 2
    },
    {
      name: 'Apple - BREAST TEST NEST',
      sku: 9175320,
      upc: '817347123934',
      department: 'TABLETS',
      departmentId: 3,
      modelNumber: 'T3ST05',
      classId: 666,
      quantity: 12
    }
  ],
  formatted: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_UPC:
      // CONCAT IN NEW PRODUCT
      return Object.assign({}, state, {
        ...state,
        products: state.products.concat(action.payload)
      });
    case FORMAT_TABLE:
      return { ...state, formatted: true };
    case INCREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? { ...product, quantity: product.quantity + 1 }
              : product
        )
      };
    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload === product.upc
              ? { ...product, quantity: product.quantity - 1 }
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
    default:
      return state;
  }
}
