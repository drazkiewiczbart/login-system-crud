const { page404 } = require('../controllers/404-controller');

module.exports = (app) => {
  app.use(page404);
};
