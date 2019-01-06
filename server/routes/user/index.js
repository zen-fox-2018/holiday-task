const Route = require('express').Router()
const userController = require('../../controllers/userController')


Route.get('/', userController.findAll)
Route.post('/', userController.insert)
Route.get('/mypoints', userController.myPoints)
Route.get('/:id', userController.findOne)
Route.put('/:id', userController.update)



module.exports = Route