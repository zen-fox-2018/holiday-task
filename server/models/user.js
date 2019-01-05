const mongoose = require('mongoose')
const Schema = mongoose.Schema
const helpers = require('../helpers/helpers')

const userSchema = new Schema ({
  email: {
    type: String,
    required: [true, 'email field cannot be empty'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      validator: function (value) {
        return User.findOne({
          email: value
        })
        .then(user => {
          if(user) {
            return false
          }
        })
        .catch(err => {
          throw new Error(err)
        })
      },
      message: props => 'email cannot be duplicated'
    }
  },
  password: {
    type: String,
    required: [true, 'password field cannot be empty']
  },
  point: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    default: '-'
  }
})

userSchema.pre('save', function (next) {
  this.password = helpers.hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User