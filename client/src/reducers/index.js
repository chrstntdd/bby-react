import { combineReducers } from 'redux';
import { POST_UPC, INCREMENT_PRODUCT_QUANTITY } from '../actions/types';
import { reducer as formReducer, change as CHANGE } from 'redux-form';
import authReducer from './auth_reducer';
import bbyAPIReducer from './bby_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer.plugin({
    // CLEAR INPUT AFTER FORM SUBMIT SUCCEEDS
    postUPC: (state, action) => {
      switch (action.type) {
        case POST_UPC:
          return undefined;
        case INCREMENT_PRODUCT_QUANTITY:
          return undefined;
        case 'persist/REHYDRATE':
          return { ...state, persistedState: action.payload };
        default:
          return state;
      }
    }
  }),
  table: bbyAPIReducer
});

export default rootReducer;
