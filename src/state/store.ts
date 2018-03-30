import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';

import { RootState, rootReducer } from './root-state';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = (initialState?: RootState) => {
  const middlewares = [reduxThunk];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), autoRehydrate());

  return createStore(rootReducer, initialState!, enhancer);
};

// pass an optional param to rehydrate state on app start
const store = configureStore();

persistStore(store, {}, () => {
  console.log('Rehydrated.');
});

// export store singleton instance
export default store;
