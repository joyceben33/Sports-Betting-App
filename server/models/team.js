const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  teamId: String,
  teamName: String,
  city: String,
  logoURL: String,
  wins: Number,
  losses: Number
}, {collection: 'Teams'})

module.exports = mongoose.model('Team', TeamSchema)