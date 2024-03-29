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
birthday: {
  type: Date,
  required: true,
  default: Date.now
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
happiness: {
  type: Number,
  required: true,
  min: 0,
  max: 100,
  default: 50
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
