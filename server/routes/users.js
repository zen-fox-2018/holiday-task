const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/')
const { UserController } = require('../controllers')

router.use(checkLogin)
router.get('/profile', UserController.profile)
router.patch('/profile', UserController.editProfile)

module.exports = router;
