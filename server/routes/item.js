const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router.post('/',itemController.addItem)
router.get('/', itemController.showItem)
router.put('/:id', itemController.modifyItem)
router.delete('/:id', itemController.deleteItem)


module.exports = router