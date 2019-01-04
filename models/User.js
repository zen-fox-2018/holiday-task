const mongoose = require('mongoose');
const hash = require('../helpers/hashPw')

const Schema = mongoose.Schema;

function uniqueEmail() {
    return new Promise((resolve, reject) => {
        User.findOne({email : this.email})
        .then(data => {
            if(data) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name must be filled']
    },
    email: {
        type: String,
        validate: [uniqueEmail, 'Email has been used'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'Email required']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [8, 'Minimum length is 8 character']
    },
    points: Number
});

userSchema.pre('save', function(next) {
    this.password = hash.hashPw(this.password)
    next()
})

userSchema.pre('findOneAndUpdate', function(next) {
    if(this._update['$set'].password) {
        this._update['$set'].password = hash.hashPw(this._update['$set'].password)
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User