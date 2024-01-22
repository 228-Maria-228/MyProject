const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((dataUser) => {
      res.status(SUCCESS_CODE).send({ data: dataUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.updateMyName = (req, res, next) => {
  const { name } = req.body;

  User.findByIdAndUpdate(req.user._id, { name }, {
    new: true,
    runValidators: true,
  })
    .then((dataUser) => {
      res.status(SUCCESS_CODE).send({ data: dataUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      if (err.code === 11000) {
        next(new NotUniqError('This name is already occupied'));
      }
      next(err);
    });
};

module.exports.updateMyTg = (req, res, next) => {
  const { tg } = req.body;

  User.findByIdAndUpdate(req.user._id, { tg }, {
    new: true,
    runValidators: true,
  })
    .then((dataUser) => {
      res.status(SUCCESS_CODE).send({ data: dataUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      if (err.code === 11000) {
        next(new NotUniqError('This tg is already registered'));
      }
      next(err);
    });
};

module.exports.register = (req, res, next) => {
  const { name, email, password, tg } = req.body;
  console.log(tg)

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash, tg })
        .then((dataUser) => {
          res.status(CREATE_CODE).send({ name: dataUser.name, email: dataUser.email });
        })
        .catch((err) => {
          if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new NotCorrectDataError('Data validation error'));
          }
          if (err.code === 11000) {
            next(new NotUniqError('This email is already registered'));
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((dataUser) => {
      const token = jwt.sign(
        { _id: dataUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '365d' },
      );

      if (!token) {
        throw new NotCorrectTokenError('Your token is invalid');
      }

      res.send({ token });
    })
    .catch(next);
};
