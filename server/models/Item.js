const mongoose = require('mongoose')

const Item = new mongoose.Schema({
  itemName: String,
  price: Number,
  point: Number
})

module.exports = mongoose.model('item', Item)