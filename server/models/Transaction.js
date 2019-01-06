const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  date: {
    type: Date,
    default: new Date()
  },
  pointEarned: {
    type: Number,
    default: 0
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction