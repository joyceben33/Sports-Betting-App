const mongoose = require('mongoose')
const Schema = mongoose.Schema
// home_team: String,
// away_team: String,
// period1: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Period'
// }],
// period2: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Period'
// }],
// period3: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Period'
// }],
// period4: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Period'
// }],
// contest: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Contest'
// }]

// _id: {type: Schema.Types.ObjectId},

const GameSchema = new Schema({
  
  play: Object,
  homeWinPercentage: Number,
  playId: String,
  tiePercentage: Number, 
  x: Number 
}, {collection: 'Game'})

module.exports = mongoose.model('Game', GameSchema)