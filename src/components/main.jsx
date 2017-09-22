import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../components/pages/landing-page/landing-page';
import ForgotPassword from './auth/forgot_password';
import Login from './auth/login';
import Logout from './auth/logout';
import Register from './auth/register';
import RequireAuth from './auth/require_auth';
import ResetPassword from './auth/reset_password';
import VerifyEmail from './auth/verify_email';
import Dashboard from './dashboard';
import NotFoundPage from './pages/not-found';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/sign-up" component={Register} />
      <Route exact path="/sign-in" component={Login} />
      <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/reset-password/:resetToken"
        component={ResetPassword}
      />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route component={NotFoundPage} />
    </Switch>
  </main>
);

export default Main;
