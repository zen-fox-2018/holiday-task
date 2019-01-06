const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  pointNeeded:{
    type: Number,
    default: 0
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item