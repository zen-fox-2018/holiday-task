const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')

module.exports = {
    isLogin: function(req, res, next) {
        jwt.verify(req.headers.token, process.env.userSecretJWT, function(err, decoded) {
            if(err) {
                res.status(400).json({message: 'You are not login. Please login first'})
            } else {
                User.findOne({
                    email: decoded.email
                })
                .then(user => {
                    req.decoded = user
                    next()
                })
                .catch(err => {
                    res.status(400).json({message: 'You are not in our database. Please register first'})
                })
            }
        });
    }
}