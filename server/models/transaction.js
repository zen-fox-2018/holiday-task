const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    date : {
        type: Date,
        default: new Date
    }, 
    items : [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref : 'Item'
        },
        totalItem: {
            type: Number, 
            required: [true, 'Total Item required']
        }
    }],
    totalPrice: {
        type : Number
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction