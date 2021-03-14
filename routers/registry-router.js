const {
  registryUserPage,
  createNewUserAccount,
  dataFormValidator,
} = require('../controllers/registry-controller');
const { userProfilePage } = require('../controllers/profile-controller');

module.exports = (app, passport) => {
  app.get('/registry', registryUserPage);
  app.post(
    '/registry',
    dataFormValidator,
    createNewUserAccount,
    passport.authenticate('local-authentication'),
    userProfilePage,
  );
};
