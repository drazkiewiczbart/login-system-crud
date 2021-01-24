'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

const postUpdate = (req, res) => {
  user.findById(req.user, (error, object) => {
    if(error) {
      req.flash('error', 'Sorry, we can\'t update your account. Please try again later');
      res.redirect('/profile');
    } else {
      const inputUpdateFormData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode,
        country: req.body.country
      };
    
      Object.keys(inputUpdateFormData).forEach(data => {
        if(inputUpdateFormData[data]) {
          object.userDetails[data] = inputUpdateFormData[data];
        };
      });
      object.save((error, object) => {
        if(error) {
          req.flash('error', 'Sorry, we can\'t update your account. Please try again later');
          res.redirect('/profile');
        } else {
          req.flash('success', 'Update data successful');
          res.redirect('/profile');
        };
      });
    };
  });
};

module.exports = {
  postUpdate
};