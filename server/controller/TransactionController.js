const Transaction = require(`../models/transaction`)
const User = require(`../models/User`)
const objectId = require(`mongoose`).Types.ObjectId

class TransactionController {
    static addCart(req, res) {
        User.findByIdAndUpdate({
            _id: req.user._id
        }, {
                $push: {
                    cart: req.body.itemId
                }
            })
            .populate(`cart`)
            .exec((err, cart) => {
                if (err) {
                    res.json({ err: err.message })
                } else {
                    res.json({ cart, messsage: `success add to cart` })
                }
            })

    }

    static delete(req, res) {
        User.findByIdAndUpdate({
            _id: req.user._id
        }, {
                $pull: {
                    cart: req.body.itemId
                }
            })
            .populate(`cart`)
            .then((result) => {
                res.json({ cart, message: `success delete` })
            }).catch((err) => {
                res.json(err)
            });
    }

    static read(req, res) {
        User.findOne({
            _id: req.user._id
        })
            .populate(`cart`)
            .then((result) => {
                res.json(result.cart)
            }).catch((err) => {
                res.json(err)
            });
    }

    static checkout(req, res) {
        User.findById({
            _id: req.user._id
        })
            .populate(`cart`)
            .then((result) => {
                let totalPrice = 0
                let points = 0
                result.cart.forEach(element => {
                    totalPrice += element.price
                });
                points = Math.round(totalPrice / 100000)
                
                if (totalPrice > 100000) {
                    return Transaction.create({
                        userId: req.user._id,
                        items: result.cart,
                        points: points,
                        totalPrice: totalPrice
                    })
                } else {
                    return Transaction.create({
                        userId: req.user._id,
                        items: result.cart,
                        totalPrice: totalPrice
                    })
                }

            })
            .then((transactionResult) => {
                res.send(transactionResult)
                
                return User.findOne({
                    _id: `5c31c8d402c8e7765467cef2`
                })
            })
            .then((userResult) => {
                console.log(userResult, `=========`);
                
                res.send(userResult)
            })
            .catch((err) => {
                res.json(err)
            });
    }

}

module.exports = TransactionController