const mongoose = require('mongoose');

const mapObjectSchema = new mongoose.Schema({
  name: String,
  lattitude: Number,
  longitude: Number,
  icon: { type: String, default: 'images/marker.png' },
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('MapObject', mapObjectSchema);
