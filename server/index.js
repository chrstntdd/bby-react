const express = require('express'),
  app = express(),
  logger = require('morgan'),
  config = require('./config/main');

// START THE SERVER
const server = app.listen(config.port);
console.log(`Your server is up and running on port ${config.port}`);

// MIDDLEWARE STACK
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
