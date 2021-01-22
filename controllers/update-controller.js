'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('users');

// Post controller
const postController = (req, res) => {
  user.findById(req.user, (error, user) => {
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
        user.userDetails[data] = inputFormData[data];
      }
    });
    user.save();
    req.flash('success', 'Update data successful');
    res.redirect('/profile');
  });
}

module.exports = { postController }