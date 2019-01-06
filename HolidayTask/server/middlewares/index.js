const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    isLogin: function(req, res, next) {
        let token = req.headers.token
        if (token) {
            let decoded = jwt.verify(token, process.env.jwt_secret)
            User
                .findOne({ email: decoded.email })
                .then((user) => {
                    if (user) {
                        req.currentUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            point: user.point
                        }
                        next()
                    } 
                })
                .catch((err) => {
                    res.status(500).json(err.message)
                })
        } else {
            res.status(400).json({
                msg: `Please login first!`
            })
        }
    }
}