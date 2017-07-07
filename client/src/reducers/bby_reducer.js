import { POST_UPC, FORMAT_TABLE } from '../actions/types';

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
    default:
      return state;
  }
}
