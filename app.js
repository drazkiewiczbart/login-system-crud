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
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./libs/passport/local-authentication');
require('dotenv').config();
const { logger } = require('./libs/log4js/config');

/*
** Start server listening
*/

try {
  app.listen(process.env.PORT, process.env.HOST);
  logger.info('Server listening.');
} catch (err) {
  logger.fatal(`Start server problem. ${err}`);
  process.exit();
}

/*
** Connection to database
*/

const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
};
const databaseConnection = mongoose.connect(process.env.DB_PATH, dbConfig)
  .then((connect) => {
    logger.info('Database connected.');
    return connect.connection.getClient();
  })
  .catch((err) => {
    logger.fatal(`Connect database problem. ${err}`);
    process.exit();
  });

/*
** App set / use
*/

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: 'sessions',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 1,
  },
  store: MongoStore.create({ client: databaseConnection }),
}));
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

app.all('/*', (_, res) => {
  res.redirect('/');
});
