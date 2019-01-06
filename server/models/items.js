const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, " Title can't be blank"]
    },
    price: {
        type: Number,
        required: [true, "Price can't be blank"]
    },
    first_stock: {
        type: Number,
        required: [true, "Stock can't be blank"]
    },
    stock: {
        type: Number,
        required: [true, "Stock can't be blank"]
    },
    point_redeem: {
        type: Number,
        required: [true, "point redeem can't be blank"]
    },
    description: {
        type: String,
        required: [true, "Description can't be blank"]
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item