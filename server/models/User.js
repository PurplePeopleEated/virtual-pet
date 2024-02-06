const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  pets: [//array of pet ids
]
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

userSchema.virtual('petCount').get(function() {
  return this.pets.length;
});

const User = model('User', userSchema);

module.exports = User;
