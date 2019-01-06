const User = require('../models/User')
const bcrypt = require('bcryptjs')
const helpers = require('../helpers')
const Item = require('../models/Items')

module.exports = {
    register: function(req, res) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User
            .create(newUser)
            .then((user) => {
                res.status(201).json(user)
            })
            .catch((err) => {
                let nameErr = err.errors.name
                let emailErr = err.errors.email
                let passErr = err.errors.password
                if (emailErr) {
                    res.status(400).json(emailErr.message)
                } else if (nameErr) {
                    res.status(400).json(nameErr.message)
                } else if (passErr) {
                    res.status(400).json(passErr.message)
                }
            })
    },
    login: function(req, res) {
        User
            .findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = helpers.generateJsonToken({
                            name: user.name,
                            email: user.email,
                            point: user.point
                        })
                        res.status(200).json(token)
                    } else {
                        res.status(400).json({
                            msg: `Wrong password!`
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: `Wrong email!`
                    })
                }
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    },
    getProfile: function(req, res) {
        User
            .findOne({ email: req.currentUser.email })
            .then((userLogin) => {
                if (userLogin) {
                    res.status(200).json({
                        name: userLogin.name,
                        email: userLogin.email,
                        point: userLogin.point
                    })
                } else {

                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    editProfile: function(req, res) {
        let updateProfile = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User
        .findById(req.currentUser.id, (err, user) => {
            console.log('masukk')
                if (err) {
                    console.log(err) 
                } else {
                    user.set(updateProfile)
                    user.save((err, updatedUser) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).json(updatedUser)
                        }
                    })
                }
            })
    },
    suggestedRewardItems: function(req, res) {
        Item
            .find({})
            .then((items) => {
                return User
                        .findOne({ _id: req.currentUser.id })
                        .then((user) => {
                            const filtered = items.filter((val) => {
                                return val.pointPrice <= user.point
                            })
                            res.status(200).json(filtered)
                        })
            })
    }
}