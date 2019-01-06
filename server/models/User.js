var mongoose = require(`mongoose`)

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    point: Number,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Item`
    }],
})

var User = mongoose.model(`User`, userSchema)

module.exports = User