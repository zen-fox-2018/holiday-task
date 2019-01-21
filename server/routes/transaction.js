const route = require(`express`).Router()
const TransactionController = require(`../controller/TransactionController`)
const checkLogin = require(`../middlewares/checkLogin`)

route.use(checkLogin)
route.put(`/checkout`, TransactionController.checkout)
route.post(`/cart`, TransactionController.addCart)
route.delete(`/cart`, TransactionController.delete)
route.get(`/`, TransactionController.readAll)
route.get(`/:id`, TransactionController.readOne)

module.exports = route