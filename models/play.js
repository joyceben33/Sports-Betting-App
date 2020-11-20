const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PlaySchema = new Schema({
  play: Object,
  homeWinPercentage: Number,
  playId: String,
  tiePercentage: Number, 
  x: Number,
  gameId: String, 
}, {collection: 'Plays'})

module.exports = mongoose.model('Play', PlaySchema)