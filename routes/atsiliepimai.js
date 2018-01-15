const Atsiliepimai = require('../models/Atsiliepimas');
const User = require('../models/User');

module.exports = (app, passport) => {
  // Atsiliepimų kūrimo forma
  app.get('/atsiliepimas/create', isLoggedIn, (req, res) => {
    res.render('atsiliepimai/create');
  });

  // Atsiliepimų sukūrimas serveryje
  app.post('/atsiliepimai/new', isLoggedIn, (req, res) => {
    Atsiliepimai.create(req.body.atsiliepimas, (err, sukurtasAtsiliepimas) => {
      if (err) {
        res.json(err);
      } else {
        User.findById(req.user._id, (err, user) => {
          if (err) {
            res.json(err);
          } else {
            sukurtasAtsiliepimas.autorius = user;
            sukurtasAtsiliepimas.vardas = user.facebook.name;
            sukurtasAtsiliepimas.save();
            res.redirect('/');
          }
        });
      }
    });
  });

  // Visų atsiliepimų peržiūra
  app.get('/atsiliepimas/showall', (req, res) => {
    Atsiliepimai.find({}, (err, rastiAtsiliepimai) => {
      if (err) {
        res.json(err);
      } else {
        res.render('atsiliepimai/index', { atsiliepimai: rastiAtsiliepimai });
      }
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
