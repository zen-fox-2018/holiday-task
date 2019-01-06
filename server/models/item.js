const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'item name must be required']
    },
    price: {
        type: Number, 
        required: [true, 'item price must be required']
    },
    exchanged_with_point: {
        type: Boolean,
        default: false,  
    },
    points_required: Number
})

const Item = mongoose.model('Item', itemSchema)
module.exports  = Item