var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const middlewares = require('../middlewares/middleware')

router.post('/', userController.create)
router.post('/login', userController.login)
router.put('/', middlewares.decoded, userController.update)

module.exports = router;
