function checkPass(hash, pass) {
    const bcrypt = require('bcryptjs')
   return bcrypt.compareSync(pass, hash)
}

module.exports = checkPass