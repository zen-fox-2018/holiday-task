const Route = require('express').Router()
const transactionController = require('../../controllers/transactionController')

Route.post('/', transactionController.insert)
Route.get('/', transactionController.findAll)












module.exports = Route