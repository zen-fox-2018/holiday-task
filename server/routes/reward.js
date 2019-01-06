var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const rewardController = require('../contrroller/reward');

router.post('/', middleware.authentication, middleware.authorizationAdmin, rewardController.create);
router.get('/', middleware.authentication, rewardController.getAll);
router.put('/:id', middleware.authentication, middleware.authorizationAdmin, rewardController.update);
router.delete('/:id', middleware.authentication, middleware.authorizationAdmin, rewardController.delete);

module.exports = router;