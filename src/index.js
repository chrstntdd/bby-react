import './index.scss';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';

import Main from './components/main';
import reducers from './reducers/index';

// ADD IN REDUX DEBUGGER
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// CONFIGURE STORE TO PERSIST STATE AND USE REDUX DEV TOOLS
const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(reduxThunk), autoRehydrate())
);

persistStore(store, {}, () => {
  console.log('Rehydrated.');
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
);
