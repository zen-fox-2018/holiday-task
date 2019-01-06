var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const { isLogin } = require('../middleware/validations')

/* GET users listing. */
router.put('/', isLogin, userController.update_user)


module.exports = router;
