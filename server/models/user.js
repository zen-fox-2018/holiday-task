
var mongoose = require('mongoose');
const genPas = require('../helpers/genPas')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "name" : String,
    "email" : String,
    "password" :String,
    "gender" : String,
    "point": Number
});

userSchema.pre('save', function(next) {
    this.password = genPas(this.password)
    next();
});
userSchema.pre('findOneAndUpdate', function(next) {
    this._update['$set'].password = genPas(this._update['$set'].password)
    next()
  });
var User = mongoose.model('User', userSchema);


module.exports = User