const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController')

router.get('/', TransactionController.createTransaction)



module.exports = router