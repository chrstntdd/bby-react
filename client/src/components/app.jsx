import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Main from './main';

import './app.scss';

const App = () =>
  <div className="card">
    <Main />
  </div>;

export default App;
