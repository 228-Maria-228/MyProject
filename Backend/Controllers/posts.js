const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Posts = require('../models/Posts');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');
const NotUniqError = require('../utils/notUniqError');

module.exports.createPosts = (req, res) => {
  Posts.create(req.body)
    .then((dataPosts) => {
      res.status(SUCCESS_CODE).send({ data: dataPosts });
    })
    .catch(next);
};

module.exports.getPosts = (req, res) => {
    Posts.find()
      .then((dataPosts) => {
        res.status(SUCCESS_CODE).send({ data: dataPosts });
      })
      .catch(next);
  };

module.exports.updatePosts = (req, res, next) => {
  const { name } = req.body;

  Posts.update(req.body, {name}, {
    new: true,
    runValidators: true,
  })
    .then((dataPosts) => {
      res.status(SUCCESS_CODE).send({ data: dataPosts });
    })
    .catch(next);
};

module.exports.DeletePosts = (req, res, next) => {
  const { _id } = req.body;

  Posts.findByIdAndDelete({_id})
    .then((dataPosts) => {
      res.status(SUCCESS_CODE).send({ data: dataPosts });
    })
    .catch(next);
};
