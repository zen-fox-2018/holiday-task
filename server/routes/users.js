var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')
const { isLogin } = require('../middleware/isLogin')

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/myProfile', isLogin, user.myProfile);
router.put('/myProfile', isLogin, user.updateProfile);
router.patch('/myProfile', isLogin, user.updatePoints);

module.exports = router;