const AuthenticationController = require('./controllers/authentication'),
  express = require('express'),
  passportService = require('./config/passport'),
  passport = require('passport');

// MIDDLEWARE  TO REQUIRE LOGIN/AUTH
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  // SET AUTH ROUTES AS A SUBROUTE TO apiRoutes
  apiRoutes.use('/auth', authRoutes);
  // REGISTRATION ROUTE
  authRoutes.post('/register', AuthenticationController.register);
  // LOGIN ROUTE
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  // SET URL FOR API GROUP ROUTES
  app.use('/api', apiRoutes);
};
