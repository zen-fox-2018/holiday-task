const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// API for CRUD reward items

router.get('/', function(req, res) {
    Item.find({}, function(err, items) {
        if (err) res.status(400).json({err: err.message})
        else {
            res.status(200).json(items)
        }
    })
})
router.post('/', function(req,res) {
    let newItem = new Item({
        name: req.body.name, 
        price: req.body.price, 
        exchanged_with_point: req.body.exchanged_with_point,
        points_required: req.body.points_required,
    })
    newItem.save(function(err) {
        if (err) res.status(400).json({err: err.message})
        else {
            res.status(200).json(newItem)
        }
    })
}) 
router.delete('/:item_id', function(req, res) {
    Item.findByIdAndRemove(req.params.item_id, function(err) {
        if (err) res.status(400).json({err: err.message})
        else {
            res.status(200).json({message: 'sucess delete item'})
        }
    })
})
router.put('/:item_id', function(req, res) {
    let updated_value = {
        name: req.body.name, 
        price: req.body.price, 
        exchanged_with_point: req.body.exchanged_with_point,
        points_required: req.body.points_required
    }
    Item.findOneAndUpdate({_id: req.params.item_id}, updated_value, function(err, item) {
        if (err) res.status(400).json({err: err.message})
        else {
            res.status(200).json(item)
        }
    })
})

module.exports = router;
