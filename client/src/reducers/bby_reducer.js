import { POST_UPC, FORMAT_TABLE, INCREMENT_QUANTITY } from '../actions/types';

const INITIAL_STATE = {
  products: [],
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
    case INCREMENT_QUANTITY:
      return {
        ...state,
        products: state.products.map(
          product =>
            action.payload.upc === product.upc
              ? { ...product, quantity: product.quantity + 1 }
              : product
        )
      };
    default:
      return state;
  }
}
