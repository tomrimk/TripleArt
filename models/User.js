const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  sessionid: String,
  issukis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issukis'
    }
  ],
  objektai: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Objektai'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
