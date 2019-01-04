const route = require('express')()
const Item = require('../controllers/itemController')

route.get('/', Item.findAllItem)
route.post('/', Item.createItem)
route.get('/:id', Item.findOneItem)
route.put('/:id', Item.updateItem)
route.delete('/:id', Item.deleteItem)

module.exports = route