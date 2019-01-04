const route = require('express').Router()
const ItemCon = require('../controllers/ItemCon')

route.post('/', ItemCon.createItem)
route.get('/', ItemCon.getAll)
route.put('/:id' , ItemCon.update)
route.delete('/:id' , ItemCon.delete)

module.exports = route