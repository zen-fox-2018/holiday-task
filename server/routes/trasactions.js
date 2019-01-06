var express = require('express')
var router = express.Router()
const trasactionController = require('../controllers/trasactions')
const { isLogin } = require('../middleware/validations')


router.get('/', isLogin, trasactionController.get_transaction)
router.get('/redeem', isLogin, trasactionController.get_redeem)
router.post('/add_to_cart', isLogin, trasactionController.add_to_cart)
router.get('/add_to_cart', isLogin, trasactionController.get_cart)
router.post('/checkout', isLogin, trasactionController.checkout)



module.exports = router