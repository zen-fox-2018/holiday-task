var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController.js')

/* GET users listing. */
router
      .get('/', function (req, res, next) {
        res.status(200).json({ title: 'Homepage' });
      })
      .post('/register', controller.register)
      .post('/login', controller.login)


module.exports = router;
