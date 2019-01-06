var express = require('express');
var router = express.Router();
var controller  = require('../controllers/itemController.js')
var authentication = require('../middlewares/auth.js')

router
      .get('/', controller.showItem)
      .get('/rewardlist', authentication, controller.showRewardItem)
      .post('/', authentication, controller.addItem)
      // .put('/', authentication, controller.)

module.exports = router;
