const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    userCheck: function(req, res, next) {
        if(!req.headers.token) {
            res.status(400).json({
                msg: "Bad Request"
            })
        } else {
            const token = req.headers.token
            const decode = jwt.verify(token, 'makan indomie enak')
            User.findOne({email: decode.email})
            .then(user => {
                req.currentUser = user
                next()
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal Server Error"
                })
            })
        }
    }
}