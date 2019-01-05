const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')

module.exports = {
    isAdmin: function(req, res, next) {
        if(req.decoded.role == "admin"){
            next()
        } else {
            res.status(400).json({message: "You are not an admin"})    
        }
    }
}