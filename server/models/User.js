const mongoose = require('mongoose')
const Schema = mongoose.Schema
const helper = require('../helpers/helper.js')

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'email must be filled']
  },
  password: {
    type: String,
    required: [true, 'password must be filled']
  },
  point: {
    type: Number,
    default: 0
  },
  cart: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})

userSchema.pre('save', function(next){
  if(this.password){
    this.password = helper.encrypt(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User