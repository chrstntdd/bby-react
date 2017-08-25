import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import Main from './components/main';
import { LOGIN_SUCCESS } from './actions/types';
import { BrowserRouter as Router } from 'react-router-dom';
import { autoRehydrate, persistStore } from 'redux-persist';

// ADD IN REDUX DEBUGGER
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// CONFIGURE STORE TO PERSIST STATE AND USE REDUX DEV TOOLS
const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(reduxThunk), autoRehydrate())
);

// BEGIN PERSISTING STATE
/* TODO: BREAK OUT REDUCERS INTO SEPARATE CONCERNS SO THAT STATE CAN BE PERSISTED CONDITIONALLY */
persistStore(store, () => {
  console.log('rehydration complete!');
});

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
);
