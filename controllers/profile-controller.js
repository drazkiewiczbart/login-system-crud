const mongoose = require('mongoose');
const user = mongoose.model('users');

const getController = (req, res) => {
  user.findById(req.user, (err, user) => {
    res.render('profile-view', { data: user.email});
  });
}

module.exports = getController;