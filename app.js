const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes')

const app = express()
const port = 3000

const url = 'mongodb://localhost/holiday_task'
mongoose.connect(url, { useNewUrlParser: true })
.then(()=>{console.log("connected")},
  err =>{console.log("err",err);}
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', route)

app.listen(port, () => {
    console.log('Connected on port', port)
})