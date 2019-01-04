const route = require('express').Router()
const user = require('./userRoute')
const transaction = require('./transRoute')
const item = require('./itemRoute')
const checkUser = require('../helpers/checkUser').checkUser

route.get('/', (req, res) => {
    res.status(200).json({
        msg: `Success in home route`
    })
})

route.use('/user', user)
route.use('/transaction',checkUser , transaction )
route.use('/item',checkUser , item)

module.exports = route