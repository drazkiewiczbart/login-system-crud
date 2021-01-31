const { registryUserPage, createNewUserAccount, dataFormValidator } = require('../controllers/registry-controller');

module.exports = (app) => {
  app.get('/registry', registryUserPage);
  app.post('/registry', dataFormValidator, createNewUserAccount);
};
