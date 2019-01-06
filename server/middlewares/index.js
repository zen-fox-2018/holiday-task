const jwt = require('jsonwebtoken')
const { User } = require('../models')

function checkLogin(req, res, next) {
    const { token } = req.headers
    if (token) {
        const payloads = jwt.verify(token, 'secret')
        User.findById(payloads._id)
            .then(user => {
                if (user) {
                    res.locals.payloads = {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        points: user.points
                    }
                    next()
                } else {
                    res.status(400).json({
                        error: 'no such user'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err      
                })
            })
    } else {
        res.sendStatus(403)
    }

}

function checkAdmin(req, res, next) {
    if (res.locals.payloads.role === 'admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = { checkLogin, checkAdmin }
