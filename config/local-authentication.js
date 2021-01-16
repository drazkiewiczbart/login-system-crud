const bcrypt = require('bcrypt');

/*
* Validation password function
*/
const passwordValidation = (user, password) => {
  bcrypt.compare(password, user.passport, (err, result) => {
    if(err) { return false };
    return result;
  })
}

/*
* Passport local auth strategy
*/
module.exports = function(passport, LocalStrategy, mongoose) {
  const user = mongoose.model('users');

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    user.findById(_id, (err, user) => {
      return done(err, user._id);
    })
  });

  passport.use('local-authentication', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(email, password, done) {
      user.findOne({ email: email }, (err, user) => {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }
        if(passwordValidation(user, password)) { return done(null, false,); }
        return done(null, user);
      });
    }
  ));
}