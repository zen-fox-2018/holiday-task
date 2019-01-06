var express = require('express')
var router = express.Router()
const itemController = require("../controllers/items")
const { isLogin } = require('../middleware/validations')

router.post('/', isLogin, itemController.create_item)
router.get('/', isLogin, itemController.get_item)

module.exports = router

