const User = require('../models/User')
const Item = require('../models/Item')
const jwt = require('jsonwebtoken')
const hash = require('../helpers/hashPw')
const Transaction = require('../models/Transaction')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    registerUser: function(req, res) {
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            points: 0
        }
        User.create(data)
        .then(user => {
            res.status(200).json({
                msg: 'Success create user',
                user
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    },
    findAllUser: function(req, res) {
        User.find({})
        .then(users => {
            res.status(200).json({
                msg: 'Success Find All user',
                users
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    },
    findOneUser: function(req, res) {
        User.findById(req.params.id)
        .then(user => {
            res.status(200).json({
                msg: 'User Found',
                user
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    },
    updateUser: function(req, res) {
        let data = {
            name : req.body.name,
            email : req.body.email,
            password: req.body.password
        }
        for(let key in data) {
            if(data[key] === undefined) {
                delete data[key]
            }
        }
        //new true spy bisa keupdate, kalo gak ada gak bisa ke update, isinya masi value yang lama
        User.findOneAndUpdate(req.params.id, {$set: data}, {new: true})
        .then(user => {
            res.status(200).json({
                msg: 'Success update user',
                user
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    },
    deleteUser: function(req, res) {
        User.findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).json({
                msg: 'Success delete user',
                user
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    },
    loginUser: function(req, res) {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                res.status(404).json({
                    msg: 'User not found'
                })
            } else {
                if(hash.comparePw(req.body.password, user.password)) {
                    res.status(200).json({
                        msg: 'Success log in',
                        token: jwt.sign({
                            id: user._id,
                            email: user.email,
                            points: user.points
                        }, 'makan indomie enak')
                    })
                } else {
                    res.status(401).json({
                        msg: 'Wrong Password'
                    })
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    },
    viewPoints: function(req, res) {
        User.findById(req.params.id)
            .then(user => {
                return Item.find({points: {$lte: user.points}})
            })
            .then(items => {
                res.status(200).json({
                    msg: 'You Can Exchange Your Point With This Item',
                    items
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Internal server error',
                    err
                })
            })
    },
    viewTransaction: function(req, res) {
        Transaction.find({userId: ObjectId(req.params.id)}).populate('userId').populate('itemsId').exec()
        .then(data => {
            res.status(200).json({
                msg: 'Transaction data',
                data
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal server error',
                err
            })
        })
    }
}