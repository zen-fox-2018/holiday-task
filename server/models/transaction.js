const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        amount: {
            type: Number,
            required: [true, 'amount is required']
        }
    }],
    totalPrice: {
        type: Number
    },
    date: {
        type: Date,
        default: new Date
    },
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction