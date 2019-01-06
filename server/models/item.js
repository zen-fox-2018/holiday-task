const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name Required']
    },
    price: {
        type: Number,
        required: [true, 'Price Required']
    }, 
    pointNeeded : {
        type : Number,
        default: null
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item