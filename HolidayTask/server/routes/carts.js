var express = require('express')
var router = express.Router()
var cartController = require('../controllers/cartController')
var check = require('../middlewares')

router.use(check.isLogin)

/*Add item to cart*/
router.post('/', cartController.addCart)

/*detail cart */
router.get('/', cartController.findAll)

module.exports = router