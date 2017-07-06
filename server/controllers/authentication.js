require('dotenv').config();
const jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = user => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '2h'
  });
};

// SET USER INFO FROM REQUEST
const setUserInfo = req => ({
  _id: req._id,
  firstName: req.profile.firstName,
  lastName: req.profile.lastName,
  email: req.email,
  role: req.role
});

// LOGIN ROUTE
exports.login = (req, res, next) => {
  const userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};

exports.register = (req, res, next) => {
  const email = req.body.email,
    firstName = req.body.firstName,
    lastName = req.body.lastName,
    password = req.body.password;

  // VALIDATION FOR REQUIRED FIELDS
  if (!email)
    return res.status(422).send({ error: 'You must enter an email address' });
  if (!firstName || !lastName)
    return res.status(422).send({ error: 'You must enter your full name' });
  if (!password)
    return res.status(422).send({ error: 'You must enter a password' });

  User.findOne({ email }, (err, existingUser) => {
    console.log(existingUser);
    if (err) return next(err);
    // IF EMAIL ALREADY EXISTS
    if (existingUser)
      return res.status(422).send({ error: 'That email is already in use' });
    // CREATE ACCOUNT
    let user = new User({
      email,
      password,
      profile: { firstName, lastName }
    });

    user.save((user, err) => {
      if (err) return next(err);
      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};

exports.roleAuthorization = role => (req, res, next) => {
  const user = req.user;
  User.findById(user._id, (err, foundUser) => {
    if (err) {
      res.status(422).json({ error: 'No user found' });
      return next(err);
    }
    if (foundUser.role == role) return next();
    res
      .status(401)
      .json({ error: "You're not authorized to view this content" });
    return next('Unauthorized');
  });
};
