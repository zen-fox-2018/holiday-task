const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  count: { type: Number, required: true },
  pricePerItem: Number
})

transactionSchema.pre('save', function(next) {
  Item.findById(this.item)
    .then(dataItem => {
      this.pricePerItem = dataItem.price
      next()
    })
    .catch(err => {
      return new Error('item not found')
    });
}) 

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;