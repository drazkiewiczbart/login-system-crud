'use strict'

const { 
  getController,
  postController,
  formDataValidation
} = require('../controllers/registry-controller');

module.exports = app => {
  app.get('/registry', getController);
  app.post('/registry', formDataValidation, postController);
}