const mongoose = require('mongoose');
const genPass = require('../helpers/helper').genPassword
var Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate: {
            validator: function(val) {
                return new Promise((res, rej) => {
                    User.findOne({email: val})
                    .then(data => {
                        if(data) {
                            res(false) // KALAU REJECT G MASUK CONTROLLER
                        } else {
                            res(true)
                        }
                    })
                })
            }, message: 'Email taken!'
        }
    },
    password: String,
    points: Number
});

userSchema.pre('save', function(next) {
    this.password = genPass(this.password)
    next()
})

userSchema.pre('findOneAndUpdate', function( next) {
    if (this._update['$set'].password) {
        this._update['$set'].password = genPass(this._update['$set'].password)
        next()
    } else {
        next()
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User;