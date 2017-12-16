const mongoose = require('mongoose');
const { Schema } = mongoose;

const vartotojasSchema = new Schema({
  facebookId: String,
  token: String,
  email: { type: String, default: '' },
  vardas: { type: String, default: '' },
  taskai: { type: Number, default: 10 }
});

module.exports = mongoose.model('vartotojai', vartotojasSchema);
