const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Recommendation = require('../models/Recommendation');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.createRecommendation = (req, res) => {
  Recommendation.create(req.body)
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
    })
    .catch(next);
};

module.exports.updateRecommendation = (req, res, next) => {
  const { name } = req.body;

  Recommendation.update(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
    })
    .catch(next);
};

module.exports.DeleteRecommendation = (req, res, next) => {
  const { name } = req.body;

  Recommendation.delete(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
    })
    .catch(next);
};

module.exports.AddRecommendation = (req, res, next) => {
  const { name } = req.body;

  Recommendation.add(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
    })
    .catch(next);
  };
