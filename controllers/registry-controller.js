const mongoose = require('mongoose');
const user = mongoose.model('users');
const bcrypt = require('bcrypt');
const moment = require('moment');

const getController = (req, res) => {
  res.render('registry-view');
}

const postController = (req, res) => {
  const newUser = new user({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    accountDetails: {
      createdAt: moment()
    }
  });
  newUser.save((err, user) => {
    if(err) {
      res.status(500).send(`User not added. ${err}`);
    } else {
      res.status(200).send(`User added success. ${user}`);
    }
  });
}

const postControllerValidation = (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    res.status(400).send('Need email and password');
  } else {
    next();
  }
}

module.exports = {
  getController,
  postController,
  postControllerValidation
}