const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Recommendation = require('../models/recommendation');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.getMyInfo = (req, res, next) => {
  Recommendation.findById(req.body.recommendation_id)
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
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

  Recommendation.findByIdAndUpdate(req.body.recommendation_id, { name }, {
    new: true,
    runValidators: true,
  })
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      if (err.code === 11000) {
        next(new NotUniqError('Данное имя уже занято'));
      }
      next(err);
    });
};

module.exports.updateMyTg = (req, res, next) => {
  const { tg } = req.body;

  Recommendation.findByIdAndUpdate(req.body.recommendation_id, { tg }, {
    new: true,
    runValidators: true,
  })
    .then((dataRecommendation) => {
      res.status(SUCCESS_CODE).send({ data: dataRecommendation });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      if (err.code === 11000) {
        next(new NotUniqError('Данный tg уже зарегистрирован'));
      }
      next(err);
    });
};