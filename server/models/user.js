const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name is required']
    },
    email : {
        type: String,
        validate: [{
            validator: v => {
                return /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(v)
            },
            message: 'Invalid Email Format'
        }],
        required: [true, 'Email is required']
    },
    password : {
        type: String,
        minlength: [8, 'Password must have 8 characters'],
        required : [true, 'Password is required']
    },
    role :{
        type: String,
        default: 'customer'
    },
    point :{
        type: Number,
        default: 0
    }
})

userSchema.pre('save', function(next) {
    const saltrounds = 10
    var salt = bcrypt.genSaltSync(saltrounds)
    var hash = bcrypt.hashSync(this.password, salt)

    this.password = hash
    
    if(this.name == 'christian') {
        this.role = 'admin'
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User