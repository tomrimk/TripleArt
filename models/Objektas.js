const mongoose = require('mongoose');

const objektasSchema = new mongoose.Schema({
  pavadinimas: String,
  lattitude: Number,
  longitude: Number,
  checked: { type: Boolean, default: false },
  status: {
    type: String,
    default: 'INITIAL'
  },
  mode: String,
  nuoroda: String,
  informacija: String
});

module.exports = mongoose.model('Objektas', objektasSchema);
