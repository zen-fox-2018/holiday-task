const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  item: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  date: {
    type: Date,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction