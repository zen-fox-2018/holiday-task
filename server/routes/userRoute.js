const route = require('express').Router()
const UserCon = require('../controllers/UserCon')
const checkUser = require('../helpers/checkUser').checkUser

route.post('/' ,UserCon.createUser)
route.get('/' , UserCon.getAll)
route.post('/login', UserCon.login)
route.get('/mypoints' ,checkUser ,UserCon.myPoint)
route.get('/:id', UserCon.getOne )
route.put('/:id', UserCon.editUser)

module.exports = route