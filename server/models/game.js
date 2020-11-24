const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  gameId: String,
  homeTeamId: String,
  awayTeamId: String,
  active: Boolean,
  complete: Boolean
}, {collection: 'Games'})

module.exports = mongoose.model('Game', GameSchema)