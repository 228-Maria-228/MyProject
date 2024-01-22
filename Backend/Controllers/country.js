const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Country = require('../models/country');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.createCountry = (req, res) => {
  Country.create(req.body)
    .then((dataCountry) => {
      res.status(SUCCESS_CODE).send({ data: dataCountry });
    })
    .catch(next);
  }
module.exports.updateCountry = (req, res, next) => {
  const { name } = req.body;

  Country.update(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataCountry) => {
      res.status(SUCCESS_CODE).send({ data: dataCountry });
    })
    .catch(next);
};

module.exports.DeleteCountry = (req, res, next) => {
  const { name } = req.body;

  Country.delete(req.body, {
    new: true,
    runValidators: true,
  })
    .then((dataCountry) => {
      res.status(SUCCESS_CODE).send({ data: dataCountry });
    })
    .catch(next);
};
