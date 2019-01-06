var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const userController = require('../contrroller/user');

/* GET users listing. */
router.post('/register', middleware.findUser, userController.register);
router.post('/login', userController.login);
router.get('/me', middleware.authentication, userController.getOne);
router.put('/edit', middleware.authentication, userController.edit);

module.exports = router;
