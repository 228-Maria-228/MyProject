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

module.exports.getRating = (req, res) => {
    Rating.find()
      .then((dataRating) => {
        res.status(SUCCESS_CODE).send({ data: dataRating });
      })
      .catch(next);
  };

module.exports.updateRating = (req, res, next) => {
  const { name } = req.body;

  Rating.update(req.body, {name}, {
    new: true,
    runValidators: true,
  })
    .then((dataRating) => {
      res.status(SUCCESS_CODE).send({ data: dataRating });
    })
    .catch(next);
};

module.exports.DeleteRating = (req, res, next) => {
  const { _id } = req.body;

  Rating.findByIdAndDelete({_id})
    .then((dataRating) => {
      res.status(SUCCESS_CODE).send({ data: dataRating });
    })
    .catch(next);
};
