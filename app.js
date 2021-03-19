/*
** Module dependencies
*/

const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const compression = require('compression');
const path = require('path');
const mongoose = require('mongoose');
require('./models/user-model');
const passport = require('passport');
require('./libs/passport/local-authentication');
require('dotenv').config();
const { sessionConfig } = require('./libs/session/config');
const { logger } = require('./libs/log4js/config');

/*
** App set / use
*/

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));

/*
** Controllers
*/

const { getLoginPage } = require('./controllers/login/login-controller');
const { loginInputDataValidator } = require('./controllers/login/login-input-data-validator');
const { getRegistryPage, createNewUserAccount } = require('./controllers/registry/registry-controller');
const { getProfilePage } = require('./controllers/profile/profile-controller');
const { registryInputDataValidator } = require('./controllers/registry/registry-input-data-validator');
const { deleteUserAccount } = require('./controllers/delete_user/delete-controller');
const { isUserLogin } = require('./controllers/utilities/is-login-controller');
const { logoutUser } = require('./controllers/utilities/logout-controller');
const { updateUserProfile } = require('./controllers/profile/update-user-profile-controller');

/*
** Routers
*/

app.route('/')
  .get(getLoginPage)
  .post(loginInputDataValidator, passport.authenticate('local-authentication',
    {
      successRedirect: '/profile',
      failureRedirect: '/',
      failureFlash: 'Invalid email address or password.',
    }));

app.route('/registry')
  .get(getRegistryPage)
  .post(registryInputDataValidator, createNewUserAccount, passport.authenticate('local-authentication'), getProfilePage);

app.get('/profile', isUserLogin, getProfilePage);

app.post('/update', isUserLogin, updateUserProfile);

app.get('/delete', isUserLogin, deleteUserAccount);

app.get('/logout', isUserLogin, logoutUser);

app.get('/*', (_, res) => {
  res.redirect('/');
});

/*
** Connect database and start server
*/

(async () => {
  const dbPath = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  const dbConfig = {
    user: process.env.DB_USER,
    pass: process.env.DB_USER_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  };

  try {
    await mongoose.connect(dbPath, dbConfig);
    logger.info('Database connected.');
  } catch (err) {
    logger.fatal(`Connect database problem. ${err}`);
    process.exit(1);
  }

  try {
    app.listen(process.env.PORT, process.env.HOST);
    logger.info('Server listening.');
  } catch (err) {
    logger.fatal(`Start server problem. ${err}`);
    process.exit(1);
  }
})();