const route = require(`express`).Router()
const TransactionController = require(`../controller/TransactionController`)
const checkLogin = require(`../middlewares/checkLogin`)

route.use(checkLogin)
route.put(`/checkout`, TransactionController.checkout)
route.post(`/cart`, TransactionController.addCart)
route.delete(`/cart`, TransactionController.delete)
route.get(`/`, TransactionController.read)

module.exports = route