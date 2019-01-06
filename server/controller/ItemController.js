const Item = require(`../models/Item`)

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
}

module.exports = ItemController