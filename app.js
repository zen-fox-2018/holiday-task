const express = require('express')
const app = express()
const userRoutes = require('./api/routes/users')
const transactionsRoutes = require('./api/routes/transactions')
const rewardRoutes = require('./api/routes/rewards')

app.use(express.urlencoded({ extended: false }))
app.use('/users', userRoutes)
app.use('/transactions', transactionsRoutes)
app.use('/rewards', rewardRoutes)


module.exports = app