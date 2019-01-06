const mongoose = require('mongoose')
const User = require('../models/User')
const Item = require('../models/Item')

const Transaction = new mongoose.Schema({
  UserId: {
    type: Schema.type.ObjectId, 
    ref: 'User'
  },
  ItemId: [{
    type: Schema.type.ObjectId,
    ref: 'Item'
  }],
  priceSum: Number
})

module.exports = mongoose.model('transaction', Transaction)