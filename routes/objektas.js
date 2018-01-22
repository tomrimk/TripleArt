const User = require('../models/User');
const Objektas = require('../models/Objektas');
const Issukis = require('../models/Issukis');
const vieta = require('../config/vieta');

module.exports = app => {
  // OBJEKTŲ PRIDĖJIMO FORMA
  app.get('/issukis/:id/objektas/new', (req, res) => {
    Issukis.findById(req.params.id, (err, issukis) => {
      if (err) {
        res.json(err);
      } else {
        res.render('objektas/new', { issukis });
      }
    });
  });

  // // OBJEKTO SUKŪRIMAS DB IR PRIDĖJIMAS PRIE IŠŠŪKIO
  app.post('/issukis/:id', (req, res) => {
    Issukis.findById(req.params.id, (err, issukis) => {
      if (err) {
        res.json(err);
      } else {
        Objektas.create(req.body.objektas, (err, objektas) => {
          if (err) {
            res.json(err);
          } else {
            issukis.objektai.push(objektas);
            issukis.save();
            res.redirect('/issukis/' + req.params.id);
          }
        });
      }
    });
  });

  // OBJEKTO ŽYMĖJIMASIS
  app.post('/objektas/:oid', (req, res) => {
    Objektas.findById(req.params.oid, (err, objektas) => {
      objektas.checked = true;
      objektas.save();
      res.redirect('back');
    });
  });
};
