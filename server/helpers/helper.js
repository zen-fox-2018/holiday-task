const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10)

module.exports  = {
    genPassword: function(input) {
        let hashPass = bcrypt.hashSync(input,salt)
        return hashPass
    },
    checkPass: function(input, pass) {
        let check = bcrypt.compareSync(input,pass)
        return check
    }
}