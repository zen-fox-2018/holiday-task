const Reward = require('../models/reward');
const helper = require('../helper/helper');

module.exports = {
  create(req, res) {
    Reward.create({
      name: req.body.name,
      point: req.body.point
    })
      .then(reward => {
        res.status(201).json(reward)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  getAll(req, res) {
    Reward.find({})
      .then(rewards => {
        res.status(201).json(rewards)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  update(req, res) {
    let input = helper.getInputBody(req.headers.whitelist, req.body)
    Reward.updateOne({
      _id: req.params.id
    }, input)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  delete(req, res) {
    Reward.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}