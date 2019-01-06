const jwttoken = require('../helpers/jsonwebtoken')
const bcrypt = require('../helpers/bcrypt')
const User = require('../models/user')

module.exports = {
    userAuthentication: function(req, res, next) {
        let decoded = jwttoken.decodeToken(req.headers.token)
        User.find({email: decoded.email}, function(err, user) {
            if (err) res.status(400).json({err:err})
            else {
                if (user) {
                    req.currentUser = user[0]
                    next()
                } else {
                    res.status(400).json({message: "User Not Found"})
                }
            }       
        })
    },
    checkPassword: function(req, res, next) {
        User.find({email: req.body.email}, function(err, user) {
                if (err) res.status(400).json({err:err.message})
                else {
                    if (user.length == 0) {
                        res.status(400).json({message: 'User Not Found'})
                    } else {
                        let isPassword = bcrypt.checkPassword(req.body.password, user[0].password)
                        if (isPassword) {
                            req.currentUser = user[0]
                            next()
                        } else {
                            res.status(400).json({message: 'Wrong Password'})
                        }
                    }
                }
        })
    }
}
