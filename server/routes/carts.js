var express = require('express');
var router = express.Router();
var cart = require('../controllers/cartController')
const { isLogin } = require('../middleware/isLogin')

router.post('/', isLogin, cart.createCart);
router.get('/:status', isLogin, cart.readCart);
router.put('/:id', isLogin, cart.updateCart);
router.put('/inc/:id', isLogin, cart.updateIncrement);
router.put('/del/:id', isLogin, cart.deleteCartItem);
router.put('/checkout/:id', isLogin, cart.checkOut);

module.exports = router;
