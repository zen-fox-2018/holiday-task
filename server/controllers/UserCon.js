const { User } = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { hashPass } = require('../helpers')

class UserController {
    static register(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                res.status(201).json({
                    result: user,
                    error: null
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    static login(req, res, next) {
        // console.log(req.body.email);
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = jwt.sign({
                            _id: user._id
                        }, 'secret')
                        res.status(200).json({
                            result: 'success login',
                            token: token,
                            error: null  
                        })
                    } else {
                        res.status(400).json({
                            error: 'wrong password'
                        })
                    }
                } else {
                    res.status(404).json({
                        error: 'wrong email'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static profile(req, res, next) {
        let user = res.locals.payloads
        if (user) {
            res.status(200).json({
                result: user,
                error: null
            })
        } else {
            res.status(400).json({
                error: 'plese login first'
            })
        }
    }

    static editProfile(req, res, next) {
        let { _id } = res.locals.payloads
        if (_id) {
            let obj = {}
            for (let key in req.body) {
                if (req.body[key]) {
                    obj[key] = req.body[key]
                }
            }
            // console.log(obj);
            if (obj.password) {
                obj.password = hashPass(obj.password)
            }
            // console.log(obj, '============');
            User.findByIdAndUpdate(_id, { $set: obj }, { new: true })
                .then(user => {
                    res.status(200).json({
                        result: {msg: 'success updated', data: user},
                        error: null
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        } else {
            res.status(400).json({
                error: 'please login first'
            })
        }
    }
}

module.exports = UserController
