var express = require('express');
var router = express.Router();
const itemController = require('../contrroller/item');
const middleware = require('../middleware/middleware');

router.post('/', middleware.authentication, middleware.authorizationAdmin, itemController.create);
router.get('/', itemController.getAll)

module.exports = router;