import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Main from './main';
import Navigation from './navigation';

import './app.scss';

const App = () =>
  <div className="card">
    <Navigation />
    <Main />
  </div>;

export default App;
