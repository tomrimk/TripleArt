const User = require('../models/User');
const Objektas = require('../models/Objektas');
const Issukis = require('../models/Issukis');

module.exports = app => {
  // IŠŠŪKIO SUKŪRIMO FORMA
  app.get('/issukis/new', (req, res) => {
    res.render('issukis/new');
  });

  // IŠŠŪKIO SUKŪRIMAS DB
  app.post('/issukis', (req, res) => {
    Issukis.create(req.body.issukis, (err, issukis) => {
      if (err) {
        res.json(err);
      } else {
        res.redirect('/issukis');
      }
    });
  });

  // VISŲ IŠŠŪKIŲ ATVAIZDAVIMAS
  app.get('/issukis', (req, res) => {
    Issukis.find({}, (err, issukiai) => {
      if (err) {
        res.json(err);
      } else {
        res.render('issukis/index', { issukiai });
      }
    });
  });

  // TAM TIKRO IŠŠŪKIO ATVAIZDAVIMAS
  app.get('/issukis/:id', (req, res) => {
    Issukis.findById(req.params.id)
      .populate({
        path: 'objektai',
        match: { checked: { $eq: false } }
      })
      .exec((err, issukis) => {
        if (err) {
          res.json(err);
        } else {
          Issukis.findById(req.params.id)
            .populate({
              path: 'objektai',
              match: { checked: { $eq: true } }
            })
            .exec((err, pazymeti) => {
              if (err) {
                res.json(err);
              } else {
                res.render('issukis/show', { issukis, pazymeti });
              }
            });
        }
      });
  });
};
