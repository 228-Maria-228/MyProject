const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Recommendations = require('../models/Recommendations');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.createRecommendations = (req, res) => {
  Recommendations.create(req.body)
    .then((dataRecommendations) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendations });
    })
    .catch(next);
};

module.exports.getRecommendations = (req, res) => {
    Recommendations.find()
      .then((dataRecommendations) => {
        res.status(SUCCESS_CODE).send({ data: dataRecommendations });
      })
      .catch(next);
  };

module.exports.updateRecommendations = (req, res, next) => {
  const { name } = req.body;

  Recommendations.update(req.body, {name}, {
    new: true,
    runValidators: true,
  })
    .then((dataRecommendations) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendations });
    })
    .catch(next);
};

module.exports.DeleteRecommendations = (req, res, next) => {
  const { _id } = req.body;

  Recommendations.findByIdAndDelete({_id})
    .then((dataRecommendations) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendations });
    })
    .catch(next);
};
