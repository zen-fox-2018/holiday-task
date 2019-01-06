const Item = require('../models/items')

module.exports = {
    create_item: (req, res) => {
        let new_item = {
            title: req.body.title,
            price: req.body.price,
            first_stock: req.body.stock,
            stock: req.body.stock,
            point_redeem: req.body.point_redeem,
            description: req.body.description

        }
        Item.create(new_item)
            .then((result) => {
                res.status(200).json(result)

            }).catch((err) => {
                res.status(400).json(err)
            });

    },
    get_item: (req, res) => {
        Item.find()
            .then((result) => {
                res.status(200).json(result)

            }).catch((err) => {
                res.status(400).json(err)
            });
    }
}