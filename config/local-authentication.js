'use strict'

const bcrypt = require('bcrypt');

const passwordValidation = (object, password_form) => {
  const userPasswordInDB = object.password;

  return bcrypt.compareSync(password_form, userPasswordInDB);
};

module.exports = function(passport, LocalStrategy, mongoose) {
  const user = mongoose.model('users');

  passport.serializeUser((object, done) => {
    return done(null, object._id);
  });

  passport.deserializeUser((_id, done) => {
    user.findById(_id, (error, object) => {
      return done(error, object._id);
    });
  });

  passport.use('local-authentication', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(email, password, done) {
      user.findOne({ emailAddress: email }, (error, object) => {
        if(error) { return done(error); }
        if(!object) { return done(null, false); }
        if(!passwordValidation(object, password)) { return done(null, false); }
        return done(null, object);
      });
    }
  ));
};