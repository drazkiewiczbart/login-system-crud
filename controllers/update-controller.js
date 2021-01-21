'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

// Get controller
const getController = (req, res) => {
  res.redirect('/profile');
}

// Post controller
const postController = async (req, res) => {
  const currentUser = await user.findById(req.user).exec();
    
  const inputFormData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    aboutMe: req.body.aboutMe,
    address: req.body.address,
    city: req.body.city,
    postCode: req.body.postCode,
    country: req.body.country
  }

  Object.keys(inputFormData).forEach(data => {
    if(inputFormData[data]) {
      currentUser.userDetails[data] = inputFormData[data];
      currentUser.save((error, data) => {
        if(error) {
          req.flash('error', 'Updata data error, please try again later');
          res.redirect('/profile');
        }
      });
    }
  });
  req.flash('success', 'Updata data success');
  res.redirect('/profile');
}

module.exports = { getController, postController }