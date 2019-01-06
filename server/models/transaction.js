var mongoose = require('mongoose');
var Item = require('../models/item')
var User = require('../')
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    "UserId": { type: 'ObjectId', ref: 'User' },
    "items": [

        { type: 'ObjectId', ref: 'Item' }
    ],
    "totalprice": Number
});

transactionSchema.pre('save' , function(next) {

    this.totalprice = 0
    this.items.forEach((i, item) => {
        
        Item.findById(item._id)
            .then(item => {
                this.totalprice += item.price
                if(item == this.items.length -1) {
                    next()
                }
            })
            .catch(err => {
                throw new Error (err)
            })
    });
})

transactionSchema.post('save' , function (transaction, next) {

    if ( transaction.totalprice >= 100000 ) {

        let points = Math.floor( transaction.totalprice / 100000 )
        let totalPoints = 0

        User.findById(transaction.UserId)
            .then(user => {
                totalPoints = user.point +points
                return User.findByIdAndUpdate(transaction.UserId, {$set: {points: totalPoints}}, {new: true})
            })
            .then(user => {
                next()
            })
            .catch(err => {
                throw new Error(err)
            })

    }
})

var Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = Transaction