const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Attractions = require('../models/Attractions');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.createAttractions = (req, res) => {
  Attractions.create(req.body)
    .then((dataAttractions) => {
      res.status(SUCCESS_CODE).send({ data: dataAttractions });
    })
    .catch(next);
};

module.exports.getAttractions = (req, res) => {
    Attractions.find()
      .then((dataAttractions) => {
        res.status(SUCCESS_CODE).send({ data: dataAttractions });
      })
      .catch(next);
  };

module.exports.updateAttractions = (req, res, next) => {
  const { name } = req.body;

  Attractions.update(req.body, {name}, {
    new: true,
    runValidators: true,
  })
    .then((dataAttractions) => {
      res.status(SUCCESS_CODE).send({ data: dataAttractions });
    })
    .catch(next);
};

module.exports.DeleteAttractions = (req, res, next) => {
  const { _id } = req.body;

  Attractions.findByIdAndDelete({_id})
    .then((dataAttractions) => {
      res.status(SUCCESS_CODE).send({ data: dataAttractions });
    })
    .catch(next);
};
