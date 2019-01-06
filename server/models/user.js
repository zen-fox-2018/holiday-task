const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('../helper/helper');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(function() {
          cb(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v), 'Email is not valid!');
        }, 5);
      },
      message: 'Default error message'
    },
  },
  password: { type: String, required: true, minlength: [8, 'Minimum password length is 8'] },
  points: { type: Number, default: 0 },
  isAdmin: Boolean
})

userSchema.pre('save', function(next) {
  let hash = helper.hashPassword(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema);


module.exports = User;
