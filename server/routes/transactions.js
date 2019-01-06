const express = require('express');
const router = express.Router();
const {TransactionController} = require('../controllers')
const {checkToken} = require('../middlewares')


router.use(checkToken)
router.post('/', TransactionController.addTransaction)
router.get('/', TransactionController.getTransactions)
router.get('/:id', TransactionController.detailTransaction)

module.exports = router;