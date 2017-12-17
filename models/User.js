const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    username: String
  }
});

module.exports = mongoose.model('User', userSchema);
