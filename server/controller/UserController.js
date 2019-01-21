const user = require(`../models/User`)
const jwt = require('jsonwebtoken');

class UserController {
    static login(req, res) {
        user.findOne({
            email: req.body.email
        }).then((result) => {
            if (!result) {
                res.send(`email tidak ada`);
            } else {
                user.findOne({
                    password: req.body.password
                }).then((pass) => {
                    if (!pass) {
                        res.send(`password salah`)
                    } else {
                        let token = jwt.sign({
                            _id: pass._id
                        }, 'secret')
                        res.json({
                            msg: `berhasil login`,
                            token: token
                        })
                    }
                }).catch((err) => {
                    res.json(err)
                });
            }
        }).catch((err) => {
            res.send(err)
        });
    }

    static register(req, res) {
        user.create(req.body)
            .then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(`tidak berhasil`)
            });
    }

    static get(req, res) {
        user.find({})
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.send(`taii`)
            });
    }

    static findById(req, res) {
        user.findById({ _id: req.params.id })
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            });
    }


}

module.exports = UserController