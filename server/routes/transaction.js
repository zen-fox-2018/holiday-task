const route = require(`express`).Router()
const TransactionController = require(`../controller/TransactionController`)
const checkLogin = require(`../middlewares/checkLogin`)

route.use(checkLogin)
route.post(`/cart`, TransactionController.addCart)
route.delete(`/cart`, TransactionController.delete)
route.get(`/`, TransactionController.read)

module.exports = route