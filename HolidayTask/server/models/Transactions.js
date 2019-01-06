var mongoose = require('mongoose')
var Schema = mongoose.Schema

var transactionSchema = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId, ref: `Item`
        }
    ],
    user: {
        type: Schema.Types.ObjectId, ref: `User`
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction