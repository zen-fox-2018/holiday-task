var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/holidayTask', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect to database")
});

var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartsRouter = require('./routes/carts');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

module.exports = app;