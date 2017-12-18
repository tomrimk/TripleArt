const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    username: String
  },
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
