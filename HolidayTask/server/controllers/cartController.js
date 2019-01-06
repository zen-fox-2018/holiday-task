var Cart = require('../models/Carts')

module.exports = {
    addCart: function(req, res) {
        Cart.findOne({
            user: req.currentUser.id
        })
        .then((cart) => {
            if (!cart) {
                let newCart = {
                    user: req.currentUser.id,
                    items: req.body.items
                }
                return Cart
                        .create(newCart)
            } else {
                return Cart
                        .findOneAndUpdate(
                            {
                                user: req.currentUser.id
                            }, 
                            {
                                $push: {
                                    items: req.body.items
                                }
                            },
                            {
                                new: true
                            }
                        )
            }
        })
        .then((newCart) => {
            res.status(201).json(newCart)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    },
    findAll: function(req, res) {
        Cart
            .find({ user: req.currentUser.id })
            .populate('items')
            .populate('user')
            .then((carts) => {
                res.status(200).json(carts)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    }
}