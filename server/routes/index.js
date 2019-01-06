const Route = require('express').Router()
const userController = require('../controllers/userController')
const itemRoutes = require('./item')
const userRoutes = require('./user')
const authorizeUser = require('../middlewares/authorizeUser')
const transactionRoutes = require('./transaction')

Route.get('/', (req, res) => {
    res.send("connect nih")
})

Route.post('/login', userController.login )
Route.post('/register', userController.insert)

Route.use('/users', authorizeUser, userRoutes)
Route.use('/items', itemRoutes)
Route.use('/transactions',authorizeUser, transactionRoutes)



module.exports = Route