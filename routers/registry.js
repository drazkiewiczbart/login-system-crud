const router = require('express').Router();
const { getController, postController } = require('../controllers/registry');

router.route('/registry')
.get(getController)
.post(postController)

module.exports = router;