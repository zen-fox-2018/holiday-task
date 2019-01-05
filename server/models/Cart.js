const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    cartItems: [{
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: { 
            type: Number, 
            default: 0 
        },
        subTotal: { 
            type: Number, 
            default: 0 
        }
    }],
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    totalPrice: { 
        type: Number, 
        default: 0 
    },
    statusCheckOut: { 
        type: String, 
        default: "undone"
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
