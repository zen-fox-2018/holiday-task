const route = require('express').Router()
const TransCon = require('../controllers/TransCon')

route.post('/', TransCon.createTrans)
route.get('/' , TransCon.getMy)

module.exports = route