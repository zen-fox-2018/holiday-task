const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index')

mongoose.connect('mongodb://localhost/holiday',{ useNewUrlParser: true } )
   


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', route)

app.listen(port, () => {
    console.log(`App listening to port ${port}`)
})
// module.exports = app