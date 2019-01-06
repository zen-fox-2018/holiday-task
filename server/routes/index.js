var express = require('express');
var router = express.Router();
const {UserController} = require('../controllers')
const usersRoutes = require('./users')
const itemRoutes = require('./item')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(400).json({
    message : 'No Page'
  })
});

router.post('/register',UserController.registerUser)
router.post('/login',UserController.loginUser)
router.use('/users', usersRoutes)
router.use('/items', itemRoutes)

module.exports = router;
