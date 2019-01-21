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

    static readAll(req, res) {
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

    static readOne(req, res) {
        Transaction.findOne({
            _id: req.params.id
        }).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
    }

    static checkout(req, res) {
        let totalPrice = 0
        let points = 0
        User.findById({
            _id: req.user._id
        })
            .populate(`cart`)
            .then((result) => {

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
                return User.findOneAndUpdate({
                    _id: req.user._id
                }, {
                        cart: [],
                        point: points
                    })
            })
            .then((userResult) => {
                res.send(userResult)
            })
            .catch((err) => {
                res.json(err)
            });
    }

}

module.exports = TransactionController