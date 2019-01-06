const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
  username: String,
  email:String,
  password: String,
  points: {type:Number, default: 0}
})

User.pre('save', (next) => {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next() 
})


module.exports = mongoose.model('user', User)