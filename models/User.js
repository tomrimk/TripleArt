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
  campaigns: [
    {
      id: String,
      registered: Boolean,
      finished: Boolean
    }
  ],
  mapObjects: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MapObject'
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
