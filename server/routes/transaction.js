var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const transactionController = require('../contrroller/transaction');

router.post('/', middleware.authentication, transactionController.create);
router.get('/', middleware.authentication, transactionController.getUserTransaction);

module.exports = router;