import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import Cookies from 'universal-cookie';
import reducers from './reducers/index';
import App from './components/app';
import { AUTH_USER } from './actions/types';
import { BrowserRouter as Router } from 'react-router-dom';
import { autoRehydrate, persistStore } from 'redux-persist';

const cookie = new Cookies();

// ADD IN REDUX DEBUGGER
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// CONFIGURE STORE TO PERSIST STATE AND USE REDUX DEV TOOLS
const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(reduxThunk), autoRehydrate())
);

// BEGIN PERSISTING STATE
persistStore(store, { blacklist: ['auth'] }, () => {
  console.log('rehydration complete!');
});

const token = cookie.get('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
  console.log('authorized as hell');
}

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
