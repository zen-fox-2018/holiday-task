const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Item = require('./Item')
const User = require('./User')

const transactionSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    totalPrice: Number
});

transactionSchema.pre('save' , function(next) {
    this.totalPrice = 0 
    this.items.forEach((e, index) => {
        Item.findById(e)
            .then(data => {
                this.totalPrice += data.price
                if(index == this.items.length -1) {
                    next()
                }
            })
            .catch(err => {
                throw err
            })
    });
})

transactionSchema.post('save' , function(trans, next) {
    if (trans.totalPrice >= 100000) {
        let point = Math.floor(trans.totalPrice/ 100000)
        let currentPoints = 0

        User.findById(trans.userId)
            .then(dataUser => {
                currentPoints = dataUser.points +point
                return User.findByIdAndUpdate(trans.userId, {$set: {points: currentPoints}}, {new: true})
            })
            .then(data => {
                next()
            })
            .catch(err => {
                throw err
            })

    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction;