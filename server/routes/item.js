var router = require('express').Router()
var {ItemController} = require('../controllers')
var {checkUserLogin, isAdmin} = require('../middlewares')


//Read item list
router.get('/', ItemController.getAllItem)

router.use(checkUserLogin)
router.use(isAdmin)
//admin privilage CUD
router.post('/addItem', ItemController.addItem)
router.patch('/updateItem/:id', ItemController.updateItem)
router.delete('/deleteItem/:id', ItemController.deleteItem)

module.exports = router