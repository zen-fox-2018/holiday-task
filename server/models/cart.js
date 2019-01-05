const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }]
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart