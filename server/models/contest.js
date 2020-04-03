const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContestSchema = new Schema({
 isStarted: Boolean,
 isActive: Boolean,
 plays: [{
    type: Schema.Types.ObjectId,
    ref: 'Play'
  }]
}, {collection: 'Contests'})

module.exports = mongoose.model('Contest', ContestSchema)