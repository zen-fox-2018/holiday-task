var express = require('express');
var router = express.Router();
const {checkUserLogin } = require('../middlewares')
const {UserController} =  require('../controllers')

/* GET users listing. */
router.use(checkUserLogin)
router.get('/profile',UserController.profile )
router.patch('/profile',UserController.editProfile)

module.exports = router;
