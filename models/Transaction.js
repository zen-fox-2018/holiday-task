const mongoose = require('mongoose');
const Item = require('./Item')
const User = require('./User')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    itemsId: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    totalPrice: Number
});

transactionSchema.pre('save' , function(next) {
    this.totalPrice = 0 
    this.itemsId.forEach((element, i) => {
        Item.findById(element)
            .then(item => {
                this.totalPrice += item.price
                if(i == this.itemsId.length-1) {
                    next()
                }
            })
    })
})

transactionSchema.post('save' , function(transaction, next) {
    if (transaction.totalPrice >= 100000) {
        User.findById(transaction.userId)
        .then(user => {
            let point = Math.floor(transaction.totalPrice/100000) * 10
            return User.findByIdAndUpdate(user._id, {$set: {points : user.points + point}}, {new: true})
        })
        .then(data => {
            next()
        })
        .catch(err => {
            throw err
        })
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction