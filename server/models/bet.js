const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BetSchema = new Schema({
  type: "Line" | "OverUnder",
  description: String,
  amount: Number,
  currrency: String,
  gameId: String
}, {collection: 'Bets'})

module.exports = mongoose.model('Bet', BetSchema)