const { getController, postController, postControllerValidation } = require('../controllers/registry-controller');

module.exports = function(app) {
  app.get('/registry', getController);
  app.post('/registry', postControllerValidation, postController);
}