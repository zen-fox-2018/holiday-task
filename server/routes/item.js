const route = require(`express`).Router()
const ItemController = require(`../controller/ItemController`)

route.get(`/`, ItemController.findAll)
route.post(`/`, ItemController.add)
route.put(`/:id`, ItemController.update)
route.delete(`/:id`, ItemController.delete)

module.exports = route