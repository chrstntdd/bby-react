import React from 'react';
import { Switch, Route } from 'react-router-dom';

// - AUTHENTICATION COMPONENTS
import Register from './auth/register';
import Login from './auth/login';
import Logout from './auth/logout';
import ForgotPassword from './auth/forgot_password';
import ResetPassword from './auth/reset_password';
import VerifyEmail from './auth/verify_email';

// - PAGES
import NotFoundPage from './pages/not-found';
import LandingPage from '../components/pages/landing-page/landing-page';

// - MISC
import Dashboard from './dashboard';

// - HIGHER ORDER COMPONENTS (DECORATORS)
import RequireAuth from './auth/require_auth';

const Main = () =>
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/reset-password/:resetToken"
        component={ResetPassword}
      />
      <Route path="/confirm-email/:verifyToken" component={VerifyEmail} />
      <Route component={NotFoundPage} />
    </Switch>
  </main>;

export default Main;
