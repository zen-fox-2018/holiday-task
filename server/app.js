const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
mongoose.connect('mongodb://localhost:27017/holiday', {useNewUrlParser: true})
.then((data) => {
    console.log('connect')
})
.catch((err) => {
    console.log(err)
})
const Route = require('./routes')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', Route)
app.listen(port, () => {
    console.log('you re listening to port 3000')
})