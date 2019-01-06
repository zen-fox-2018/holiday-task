const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers')
const {checkToken} = require('../middlewares')

router.use(checkToken)
router.get('/', UserController.findById)
router.patch('/', UserController.patch)
router.get('/points', UserController.getPoints)

module.exports = router;
