const bcrypt = require('bcrypt');
const moment = require('moment');
const { User } = require('../models/user');

const getController = (req, res) => {
  res.status(200).send();
}

const postController = (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    accountDetails: {
      createdAt: moment()
    }
  });

  // TODO: dodać instrukcje co zrobić gdy zapis się nie uda
  newUser.save();
  res.status(200).send();
}

module.exports = {
  getController,
  postController
}