const mongoose = require('mongoose');

const IssukisScheme = new mongoose.Schema({
  pavadinimas: String,
  aprasymas: String,
  objektai: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Objektas'
    }
  ],
  prizas: String,
  sukurimoData: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issukis', IssukisScheme);
