const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    items: [{
        type: Schema.Types.ObjectId, 
        ref: 'Item'
    }],
    total_price: Number,
    created_at: Date,
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports  = Transaction