const MapObject = require('../models/MapObject');
const Campaign = require('../models/Campaign');
const User = require('../models/User');

module.exports = (app, passport) => {
  app.get('/chh1s4', (req, res) => {
    res.render('raktazodis/pirmas');
  });

  app.get('/ker1t5', (req, res) => {
    res.render('raktazodis/antras');
  });
};
