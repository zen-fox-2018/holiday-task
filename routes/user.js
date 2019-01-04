const route = require('express')()
const User = require('../controllers/userController')
const userCheck = require('../helpers/userCheck').userCheck

route.get('/', User.findAllUser)
route.post('/', User.registerUser)
route.post('/login', User.loginUser)

route.get('/:id', userCheck, User.findOneUser)
route.put('/:id', userCheck, User.updateUser)
route.delete('/:id', userCheck, User.deleteUser)
route.get('/points/:id', userCheck, User.viewPoints)
route.get('/transactions/:id', userCheck, User.viewTransaction)

module.exports = route