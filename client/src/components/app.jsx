import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// - AUTHENTICATION COMPONENTS
import Register from './auth/register';
import Login from './auth/login';
import Logout from './auth/logout';
import ForgotPassword from './auth/forgot_password';
import ResetPassword from './auth/reset_password';

// - PAGES
import NotFoundPage from './pages/not-found';
import HomePage from './pages/home';

// - MISC
import Dashboard from './dashboard';

// - HIGHER ORDER COMPONENTS (DECORATORS)
import RequireAuth from './auth/require_auth';

import styles from './app.css';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className={styles.default.card}>
          <header>
            <h1>Header here</h1>
          </header>
          <nav>
            <ul>
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/register"> Register</Link>
              </li>
              <li>
                <Link to="/login"> Login</Link>
              </li>
              <li>
                <Link to="/dashboard"> Dashboard</Link>
              </li>
              <li>
                <Link to="/forgot-password"> Forgot Password?</Link>
              </li>
              <li>
                <Link to="/logout"> Logout</Link>
              </li>
            </ul>
          </nav>

          <main>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/dashboard"
                component={RequireAuth(Dashboard)}
              />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route
                exact
                path="/reset-password/:resetToken"
                component={ResetPassword}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </main>

          <footer>
            <p>Footer here</p>
          </footer>
        </div>
      </Router>
    );
  }
}
