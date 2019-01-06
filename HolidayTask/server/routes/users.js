var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var check = require('../middlewares')

/*User register*/
router.post('/', userController.register)

/*User login*/
router.post('/login', userController.login)

router.use(check.isLogin)

/*User profile */
router.get('/', userController.getProfile)

/*Edit profile*/
router.put('/', userController.editProfile)

/*get list suggested reward Item*/
router.get('/reward', userController.suggestedRewardItems)


module.exports = router;
