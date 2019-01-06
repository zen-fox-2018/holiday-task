const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'item name required']
    },
    price: {
        type: Number,
        required: [true, 'item price required']
    },
    point: {
        type: Number,
        default: null
    }
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item