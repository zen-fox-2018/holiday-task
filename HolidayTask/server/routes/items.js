var express = require('express')
var router = express.Router()
var itemController = require('../controllers/itemController')


/*find all items*/
router.get('/', itemController.findAll)

/*add new item*/
router.post('/', itemController.addItem)

module.exports = router

