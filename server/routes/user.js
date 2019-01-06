const route = require(`express`).Router()
const UserController = require(`../controller/UserController`)

//USER
route.post(`/`, UserController.register)
route.get(`/`, UserController.get)
route.get(`/:id`, UserController.findById)
route.post(`/login`, UserController.login)

module.exports = route

