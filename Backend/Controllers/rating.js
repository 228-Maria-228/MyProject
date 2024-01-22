const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Rating = require('../models/Rating');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.createRating = (req, res) => {
  Rating.create(req.body)
    .then((dataRating) => {
      res.status(SUCCESS_CODE).send({ data: dataRating });
    })
    .catch(next);
};

module.exports.updateRating = (req, res, next) => {
  const { name } = req.body;

  Rating.update(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataRating) => {
      res.status(SUCCESS_CODE).send({ data: dataRating });
    })
    .catch(next);
};

module.exports.DeleteRating = (req, res, next) => {
  const { name } = req.body;

  Rating.delete(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataRating) => {
      res.status(SUCCESS_CODE).send({ data: dataRating });
    })
    .catch(next);
};

module.exports.AddRating = (req, res, next) => {
  const { name } = req.body;

  Rating.add(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataRating) => {
      res.status(SUCCESS_CODE).send({ data: dataRating });
    })
    .catch(next);
};