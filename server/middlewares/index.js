require ('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../models') 

function checkUserLogin(req, res, next) {
    const headerToken = req.headers.token
    if(headerToken){
        let payloads = jwt.verify(headerToken, process.env.JWT_SECRET)  
        User.findById(payloads._id)
            .then(user => {
                if(user) {
                    res.locals.payloads = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        point: user.point
                    }
                    next()
                } else {
                    res.status(400).json({
                        result: null,
                        error: 'there is no user'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })  
    } else {
        res.sendStatus(403)
    }
}

function isAdmin(req, res, next) {
    if(res.locals.payloads.role == 'admin'){
        next()
    } else{
        res.sendStatus(403)
    }
}

module.exports = {checkUserLogin, isAdmin}