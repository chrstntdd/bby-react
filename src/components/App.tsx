import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../components/pages/LandingPage';
import ForgotPassword from './auth/ForgotPassword';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
import RequireAuth from './auth/RequireAuth';
import ResetPassword from './auth/ResetPassword';
import VerifyEmail from './auth/VerifyEmail';
import Dashboard from './Dashboard';
import NotFoundPage from './pages/NotFound';

export default class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/sign-up" component={Register} />
          <Route exact path="/sign-in" component={Login} />
          <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password/" component={ResetPassword} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    );
  }
}
