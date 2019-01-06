const Route = require('express').Router()
const itemController = require('../../controllers/itemController')

Route.get('/', itemController.findAll)
Route.post('/', itemController.insert)
Route.get('/:id', itemController.findOne)
Route.put('/:id', itemController.update)
Route.delete('/:id', itemController.destroy)





module.exports = Route