module.exports = function(passport, LocalStrategy, mongoose) {
  const user = mongoose.model('users');

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    user.findById(_id, (err, user) => {
      return done(err, user);
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
        if(user.password !== password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
}