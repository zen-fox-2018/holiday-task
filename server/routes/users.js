var express = require('express');
var router = express.Router();
var controller  = require('../controllers/userController.js')

router
      .get('/:userId', controller.getProfile)
      .put('/:userId', controller.editProfile)
      // .post('/register', controller.register)
      // .post('/login', controller.login)

module.exports = router;
