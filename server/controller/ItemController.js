const Item = require(`../models/Item`)
const User = require(`../models/User`)

class ItemController {
    static findAll(req, res) {
        Item.find({})
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            });
    }

    static add(req, res) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            minimumPoints: req.body.minimumPoints,
        })
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            });
    }

    static update(req, res) {
        let obj = {}
        for (const key in req.body) {
            obj[key] = req.body[key]
        }
        Item.findByIdAndUpdate({
            _id: req.params.id
        }, obj)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            });
    }

    static delete(req, res) {
        Item.findByIdAndDelete({
            _id: req.params.id
        }).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.json(err)
        });
    }

    static findAllReward(req, res) {
        
        User.findOne({
            _id: req.user._id
        }).then((userData) => {
            console.log(userData.point);
            
            return Item.find({
                minimumPoints: {
                    $lte: userData.point
                }
            })
        })
            .then((items) => {
                res.json(items)
            })
            .catch((err) => {
                res.json(err)
            });
    }
}

module.exports = ItemController
