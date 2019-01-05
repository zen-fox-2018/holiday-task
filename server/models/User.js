var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { encrypt } = require('../helpers/bcrypt')

var userSchema = new Schema({
    username:  {
        type: String,
        required: [true, 'username should not be empty']
    },
    email: {
        type: String,
        required: [true, 'email must be filled'],
        validate: [{
            validator: function(value) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)
            }, 
            message: `Please enter a valid email`
        }, { 
            isAsync: true,
            validator: function(value, cb) {
                User.findOne({ email: value}, function (err, res) {
                    cb(!res) 
                })
            },
            message: 'Email already been used'
        }]
    },
    password: {
        type: String,
        required: [true, 'password should not be empty']
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    points: {
        type: Number
    },
    role: {
        type: String,
        default: 'customer'
    }
});

userSchema.pre('save', function(next){
    this.password = encrypt(this.password)
    next()
})

var User = mongoose.model('User', userSchema);

module.exports = User