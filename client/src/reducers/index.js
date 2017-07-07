import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import bbyAPIReducer from './bby_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  table: bbyAPIReducer
});

export default rootReducer;
