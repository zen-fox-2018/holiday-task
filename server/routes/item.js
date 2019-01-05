const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router.get('/:method', itemController.find)
router.post('/', itemController.create)

module.exports = router