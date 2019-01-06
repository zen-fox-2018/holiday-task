const User = require('../models/users')
const Item = require('../models/items')

module.exports = {
    add_to_cart(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                req.body.sub_total = req.body.item.price * req.body.qty
                result.carts.push(req.body)
                result.total += req.body.item.price * req.body.qty
                result.total_item += 1
                User.updateOne({ _id: result._id }, result)
                    .then((result) => {
                        res.status(200).json({
                            result
                        })

                    }).catch((err) => {
                        res.status(400).json({
                            err
                        })
                    });
            }).catch((err) => {
                res.status(400).json({
                    err
                })

            });
    },
    get_cart(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                res.status(200).json({
                    carts: result.carts,
                    total_item: result.total_item,
                    total: result.total,
                })

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    checkout(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                let point_shopping = Math.floor(result.total / 100000) * 100
                if (result.wallet > result.total) {
                    let transaction = {
                        carts: result.carts,
                        total_item: result.total_item,
                        total_price: result.total
                    }

                    result.transactions.push(transaction)
                    result.wallet -= result.total
                    result.point += point_shopping
                    result.total = 0
                    result.total_item = 0
                    result.carts = []
                    
                    transaction.carts.forEach(item => {

                        Item.findOne({ _id: item.item._id })
                            .then((result) => {

                                if (result.stock >= item.qty) {
                                    result.stock -= item.qty

                                    Item.updateOne({ _id: result._id }, result)
                                        .then((result) => { }).catch((err) => { });
                                }
                                else {
                                    res.status(400).json({
                                        msg: "stok tidak mencukupi"
                                    })
                                }

                            })
                            .catch((err) => {
                                res.status(400).json({
                                    msg: "item sudah dihapus"
                                })
                            });
                    });

                    User.updateOne({ _id: result._id }, result)
                        .then((result) => {
                            res.status(200).json(
                                result
                            )

                        }).catch((err) => {
                            res.status(400).json(
                                err
                            )
                        });


                }
                else {
                    res.status(400).json({
                        msg: "saldo anda kurang mencukupi"
                    })
                }


            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    get_transaction: (req, res) => {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {

                res.status(200).json({
                    transactions: result.transactions
                })

            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    get_redeem: (req, res) => {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                let point = result.point
                Item.find({
                    point_redeem: { $lt: 3000 }
                }).then((result) => {


                    res.status(200).json({
                        item: result,
                        point: point
                    })
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    }
}