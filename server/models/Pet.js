const { Schema, model } = require('mongoose');

const petSchema = new Schema({
name: {
  type: String,
  required: true,
  trim: true
},
species: {
  type: String,
  required: true
},
hunger: {
  type: Number,
  required: true,
  min: 0,
  max: 100,
  default: 0
},
lastFed: {
  type: Date,
  default: Date.now
},
lastPlayed: {
  type: Date,
  default: Date.now
},
owner: {
  type: Schema.Types.ObjectId,
  ref: 'User'
}
});

const Pet = model('Pet', petSchema);

module.exports = Pet;
