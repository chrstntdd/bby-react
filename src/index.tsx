import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/object';
import 'core-js/es6/array';
import 'core-js/es6/number';
import 'smoothscroll-polyfill';

/* FOR TESTING DEV BUILD IN IE.
   PROMISE POLYFILL IS ADDED BY FUSEBOX WHEN BUNDLING FOR PROD
*/
// import 'core-js/es6/promise';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { generateAsyncComponent } from '@/ui/components/AsyncComponent';

const App = generateAsyncComponent(() => import('@/ui/App'));
import store from '@/state/store';

import './styles/index.scss';

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
