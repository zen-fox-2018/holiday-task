const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
const middlewares = require('../middlewares/middleware')

router.get('/', middlewares.decoded, transactionController.find)
router.post('/', middlewares.decoded, transactionController.create)

module.exports = router