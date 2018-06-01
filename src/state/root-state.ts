import { combineReducers } from 'redux';

import { authReducer, AuthState } from './reducers/auth-reducer';
import { tableStateReducer, TableState } from './reducers/bby-reducer';

export interface RootState {
  auth: AuthState;
  table: TableState;
}

export const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  table: tableStateReducer
});
