const route = require('express')()
const item = require('./item')
const transaction = require('./transaction')
const user = require('./user')

route.get('/', (req, res) => {
    res.send('SHOPPING APP')
})

route.use('/users', user)
route.use('/items', item)
route.use('/transactions', transaction)

module.exports = route