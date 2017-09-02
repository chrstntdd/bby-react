import { combineReducers } from 'redux';
import {
  POST_UPC,
  INCREMENT_PRODUCT_QUANTITY,
  INVALID_UPC,
  LOGIN_FAILURE,
  NOT_VERIFIED_LOGIN_ERROR,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from '../actions/types';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import bbyAPIReducer from './bby_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer.plugin({
    // CLEAR INPUT AFTER FORM SUBMIT SUCCEEDS
    postUPC: (state, action) => {
      switch (action.type) {
        case POST_UPC:
        case INCREMENT_PRODUCT_QUANTITY:
        case INVALID_UPC:
          return undefined;
        default:
          return state;
      }
    },
    login: (state, action) => {
      switch (action.type) {
        case LOGIN_FAILURE:
        case NOT_VERIFIED_LOGIN_ERROR:
          return undefined;
        default:
          return state;
      }
    },
    register: (state, action) => {
      switch (action.type) {
        case REGISTER_FAILURE:
        case REGISTER_SUCCESS:
          return undefined;
        default:
          return state;
      }
    }
  }),
  table: bbyAPIReducer
});

export default rootReducer;
