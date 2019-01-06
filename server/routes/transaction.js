var express = require('express');
var router = express.Router();
var controller  = require('../controllers/transactionController.js')
var authentication = require('../middlewares/auth.js')

router
      .get('/', authentication, controller.showCart)
      .get('/history', authentication, controller.showTransaction)
      .post('/', authentication, controller.addCart)
      .put('/checkout', authentication, controller.checkout)
      .put('/', authentication, controller.deleteCart)

module.exports = router;
