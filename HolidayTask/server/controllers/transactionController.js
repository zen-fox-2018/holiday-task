const Transaction = require('../models/Transactions')
const Cart = require('../models/Carts')
const User = require('../models/User')

module.exports = {
    newTransaction: function(req, res) {
        let listItems = []
        let total = 0
        Cart
            .find({ user: req.currentUser.id })
            .populate('items')
            .then((listCart) => {
                // console.log(listCart[0].items)
                listItems = listCart[0].items
                listCart[0].items.forEach((item, index) => {
                    total+= item.price
                })

                let newTransaction = {
                    items: listItems,
                    user: req.currentUser.id,
                    totalPrice: total,
                }
                return Transaction
                        .create(newTransaction)
                        .then((transaction) => {
                            let bonusPoint = Math.floor(transaction.totalPrice/100000) * 10
                            if (bonusPoint) {
                                return User
                                        .findOneAndUpdate({ _id: req.currentUser.id }, { point: req.currentUser.point+=bonusPoint }, { new: true })

                            } else {
                                return transaction
                            }
                        })
                        .then(() => {
                            res.status(201).json({
                                msg: `Thanks for shopping our items`
                            })
                        })
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    },
    findAll: function(req, res) {
        Transaction
            .find({ user: req.currentUser.id })
            .populate('items')
            .populate('user')
            .then((transaction) => {
                res.status(200).json(transaction)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })

    }
}