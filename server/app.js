const express = require('express')
const app = express()
const mongoose = require('mongoose')
const indexRoute = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//connect to mongoose
mongoose.connect('mongodb://localhost/server', {useNewUrlParser:true})
// mongoose.Promise = global.Promise

app.use('/', indexRoute)

app.listen(3000, ()=>{
  console.log('listening on port 3000...');
})