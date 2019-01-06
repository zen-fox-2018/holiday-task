const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPass } = require('../helpers')

const UserSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'username required']
    },
    role: {
        type: String,
        default: 'customer'
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    points: {
        type: Number,
        default: 0
    }
});

UserSchema.pre('save', function(next) {
    // test admin
    if (this.email === 'obin@mail.com') {
        this.role = 'admin'
    }
    this.password = hashPass(this.password);
    next()
})

const User = mongoose.model('User', UserSchema)

User.schema.path('email').validate(function (value, respond) {                                                                                           
    User.findOne({ email: value }, function (err, user) {                                                                                                
        if(user) respond(false);                                                                                                                         
    });                                                                                                                                                  
}, 'email is already registered');

module.exports = User