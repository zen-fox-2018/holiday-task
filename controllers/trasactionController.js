const Transaction = require('../models/Transaction')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createTransaction: function(req, res) {
        // console.log(req.currentUser, '==============')
        let data = {
            userId : ObjectId(req.currentUser._id),
            itemsId : [],
        }
        req.body.itemsId.forEach(element => {
            data.itemsId.push(ObjectId(element))
        });
        Transaction.create(data)
        .then(transaction => {
            res.status(200).json({
                msg: 'Success Create Transaction',
                transaction
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    },
    showAllTransaction: function(req, res) {
        Transaction.find({})
        .then(transactions => {
            res.status(200).json({
                msg: 'All Transactions List',
                transactions
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    }
}