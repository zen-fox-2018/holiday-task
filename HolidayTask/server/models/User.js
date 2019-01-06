var mongoose = require('mongoose')
var Schema = mongoose.Schema
var helpers = require('../helpers')
var bcrypt = require('bcryptjs')

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name must be filled']
    },
    email: {
        type: String,
        required: [true, 'Email must be filled'],
        validate: [
            {
                validator: helpers.validateEmail, msg: `Please fill a valid input email`
            },
            {
                validator: function (email) {
                    return new Promise ((resolve, reject) => {
                        User
                            .findOne({ email: email })
                            .then((found) => {
                                if (found) {
                                    reject(false)
                                } else {
                                    resolve(true)
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                }, msg: `Email already exists!`
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'Password must be filled'],
        minlength: [5, 'Invalid password, minimal input is 5 characters!']
    },
    point: {
        type: Number,
        default: 0
    }
})

userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User