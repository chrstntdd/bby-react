const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

// MIDDLEWARE  TO REQUIRE LOGIN/AUTH
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  // SET AUTH ROUTES AS A SUBROUTE TO apiRoutes
  apiRoutes.use('/auth', authRoutes);
  // REGISTRATION ROUTE
  authRoutes.post('/register', AuthenticationController.register);
  // LOGIN ROUTE
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  // PASSWORD RESET ROUTE(GEN/SEND TOKEN)
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);
  // PASSWORD RESET ROUTE(CHANGE PASSWORD WITH TOKEN)
  authRoutes.post(
    '/reset-password/:token',
    AuthenticationController.verifyToken
  );
  // TEST PROTECTED ROUTE
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({
      content: 'THE PROTECTED ROUTE IS WORKING MY GUY'
    });
  });
  // SET URL FOR API GROUP ROUTES
  app.use('/api', apiRoutes);
};
