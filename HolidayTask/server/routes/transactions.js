var express = require('express')
var router = express.Router()
var transactionController = require('../controllers/transactionController')
var check = require('../middlewares')

router.use(check.isLogin)

router.get('/', transactionController.findAll)

router.post('/', transactionController.newTransaction)

module.exports = router