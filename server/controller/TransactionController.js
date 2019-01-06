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
               
            }).catch((err) => {

            });
    }

}

module.exports = TransactionController