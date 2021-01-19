'use strict'

const bcrypt = require('bcrypt');

// Validation password function
const passwordValidation = (user, password_form) => {
  const userPasswordInDB = user.password;

  bcrypt.compare(password_form, userPasswordInDB, (error, result) => {
    if(error) { return false };
    return result;
  })
}

// Passport local auth strategy
module.exports = function(passport, LocalStrategy, mongoose) {
  const user = mongoose.model('users');

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    user.findById(_id, (error, user) => {
      return done(error, user._id);
    })
  });

  passport.use('local-authentication', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(email, password, done) {
      user.findOne({ emailAddress: email }, (error, user) => {
        if(error) { return done(error); }
        if(!user) { return done(null, false); }
        if(passwordValidation(user, password)) { return done(null, false,); }
        return done(null, user);
      });
    }
  ));
}