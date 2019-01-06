const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encrypt = require('../helpers/encrypt')

const userShema = new Schema({
    name: {
        type: String,
        require: [true, "name can't be null"]
    },
    email: {
        type: String,
        required: [true, "email can't be null"],
        validate: [{
            isAsync: true,
            validator: function (value, cb) {
                User.findOne({
                    email: value
                }, function (err, res) {
                    cb(!res)
                })
            },
            message: "User already exist"
        }]
    },
    wallet: {
        type: Number,
        default: 1000000
    },
    point: {
        type: Number,
        default: 0
    },
    carts: {
        type: Array, "default": []
    },
    total: {
        type: Number,
        default: 0
    },
    total_item: {
        type: Number,
        default: 0
    },
    transactions: {
        type: Array, "default": []
    },
    password: {
        type: String,
        required: [true, "password can't be null"],
        minlength: [5, "minimum 5 character"]
    }
})
userShema.pre('save', function () {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model("User", userShema)
module.exports = User
