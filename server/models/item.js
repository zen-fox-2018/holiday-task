const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'item name field cannot be empty']
  },
  price: {
    type: Number,
    required: [true, 'price field cannot be empty']
  },
  method: {
    type: String,
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item
