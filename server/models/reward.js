const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  name: String,
  point: Number
})

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;