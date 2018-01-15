const mongoose = require('mongoose');

const atsiliepimasSchema = new mongoose.Schema({
  ivertinimas: { type: Number, default: 0 },
  tekstas: String,
  autorius: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  vardas: String,
  sukurta: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Atsiliepimas', atsiliepimasSchema);
