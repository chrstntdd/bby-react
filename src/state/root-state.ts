import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  /* NO MORE FORM DATA IN REDUX. PLEASE!!!! */
  LOGIN_FAILURE,
  NOT_VERIFIED_LOGIN_ERROR,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE
} from './actions/types';

import { authReducer, AuthState } from './reducers/auth-reducer';
import { tableStateReducer, TableState } from './reducers/bby-reducer';

export interface RootState {
  auth: AuthState;
  table: TableState;
}

export const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  /* NO MORE FORM DATA IN REDUX. PLEASE!!!! */
  form: formReducer.plugin({
    // CLEAR INPUT AFTER FORM SUBMIT
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
    },
    resetPassword: (state, action) => {
      switch (action.type) {
        case RESET_PASSWORD_FAILURE:
        case RESET_PASSWORD_SUCCESS:
          return undefined;
        default:
          return state;
      }
    },
    forgotPassword: (state, action) => {
      switch (action.type) {
        case FORGOT_PASSWORD_SUCCESS:
        case FORGOT_PASSWORD_FAILURE:
          return undefined;
        default:
          return state;
      }
    }
  }),
  table: tableStateReducer
});
