const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
  }, 
  comparePassword(password, hash) {
    let result = bcrypt.compareSync(password, hash);
    return result
  },
  generateToken(id, email) {
    let token = jwt.sign({ id, email }, 'shhhhh');
    return token
  },
  decodeToken(token) {
    let decoded = jwt.verify(token, 'shhhhh');
    return decoded
  },
  getInputBody(whiteList, reqBody) {
    let input = {}
    Object.keys(reqBody).forEach(e => {
      if (whiteList.indexOf(e) !== -1) {
        input[e] = reqBody[e]
      }
    });
    return input
  }
}