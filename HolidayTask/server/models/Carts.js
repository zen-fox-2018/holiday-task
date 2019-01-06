var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: `User`
    },
    items: [
        {
            type: Schema.Types.ObjectId, ref: `Item`
        }
    ]
})

var Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart