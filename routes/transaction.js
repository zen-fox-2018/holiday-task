const route = require('express')()
const Transaction = require('../controllers/trasactionController')
const userCheck = require('../helpers/userCheck').userCheck

route.post('/', userCheck, Transaction.createTransaction)
route.get('/', Transaction.showAllTransaction)

module.exports = route