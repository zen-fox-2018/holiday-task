const bcrypt = require('bcryptjs')

function hashPass(pass) {
    return bcrypt.hashSync(pass, 10)
}

module.exports = { hashPass }