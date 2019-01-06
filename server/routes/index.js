var express = require('express');
var router = express.Router();

const { UserController } = require('../controllers')
const userRoutes = require('./users')
const itemRoutes = require('./items')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/users', userRoutes)
router.use('/items', itemRoutes)

module.exports = router;
