const route = require(`express`).Router()
const ItemController = require(`../controller/ItemController`)
const checkLogin = require(`../middlewares/checkLogin`)

route.use(checkLogin)
route.get(`/`, ItemController.findAll)
route.post(`/`, ItemController.add)
route.put(`/:id`, ItemController.update)
route.delete(`/:id`, ItemController.delete)
route.get(`/rewards`, ItemController.findAllReward)

module.exports = route