const User = require('../models/users')
const dcrypt = require('bcryptjs')
const { create_token } = require('../helpers/token')


module.exports = {
    register: (req, res) => {
        let new_user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(new_user)
            .then((result) => {
                res.status(200).json(result)

            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((result) => {
                let dcryptPass = dcrypt.compareSync(req.body.password, result.password)
                if (dcryptPass) {
                    let data = {
                        _id: result._id,
                        name: result.name,
                        email: result.email
                    }

                    let data_token = create_token(data)
                    res.status(200).json({
                        data_token: data_token
                    })
                }
                else {
                    res.status(400).json({
                        message: "wrong email please try again"
                    })
                }

            }).catch((err) => {
                res.status(400).json({
                    message: "wrong email please try again"
                })
            });
    },
    get_user: (req, res) => {
        User.findOne({ email: req.decoded.email })
            .then((result) => {
                let user = {
                    wallet: result.wallet,
                    point: result.point,
                    carts: result.carts,
                    total: result.total,
                    total_item: result.total_item,
                    transactions: result.transactions,
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                }
                res.status(200).json(user)

            }).catch((err) => {
                res.status(200).json(err)
            });
    },
    update_user: (req, res) => {
        User.findOne({ email: req.decoded.email })
            .then((result) => {
                result.name = req.body.name
                result.email = req.body.email
                User.updateOne({ _id: result._id }, result)
                    .then((result) => {
                        res.status(200).json(result)
                    }).catch((err) => {
                        res.status(400).json(user)
                    });


            }).catch((err) => {
                res.status(200).json(err)
            });
    },


}