import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from '@/ui/components/RequireAuth';

import NotFoundPage from '@/ui/pages/NotFound';
import VerifyEmail from '@/ui/pages/VerifyEmail';
import ForgotPassword from '@/ui/pages/ForgotPassword';
import Register from '@/ui/pages/Register';
import ResetPassword from '@/ui/pages/ResetPassword';
import Login from '@/ui/pages/Login';

import { generateAsyncComponent } from '@/ui/components/AsyncComponent';

const LandingPage = generateAsyncComponent(() => import('@/ui/pages/LandingPage'));
const Dashboard = generateAsyncComponent(() => import('@/ui/pages/Dashboard'));

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/sign-up" component={Register} />
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/" component={ResetPassword} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
