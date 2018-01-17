const mongoose = require('mongoose');

const CampaignScheme = new mongoose.Schema({
  title: String,
  autorius: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    vardas: String
  },
  mapObject: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MapObject'
      },
      name: String,
      lattitude: Number,
      longitude: Number,
      raktazodis: String
    }
  ],
  sukurimoData: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', CampaignScheme);
