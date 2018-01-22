const User = require('../models/User');
const Objektas = require('../models/Objektas');
const Issukis = require('../models/Issukis');

module.exports = app => {
  // LANDING PAGE
  app.get('/', (req, res) => {
    Issukis.find({}, (err, allCampaigns) => {
      if (err) {
        console.log(err);
        res.redirect('/landing');
      } else {
        res.render('landing', { user: req.user, campaigns: allCampaigns });
      }
    });
  });

  app.get('/test', (req, res) => {
    res.render('issukis/test');
  });

  // NEEGZISTUOJANTIEMS PUSLAPIAMS
  app.get('*', (req, res) => {
    res.send('Sis puslapis neegzistuoja');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
