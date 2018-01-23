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
  app.post('/issukis/:id/objektas/:oid', (req, res) => {
    // User.findOne({ sessionid: req.session.id })
    //   .populate('objektai')
    //   .exec((err, vartotojas) => {
    //     if (err) {
    //       res.json(err);
    //     } else {
    //       Objektas.findById(req.params.oid, (err, objektas) => {
    //         if (err) {
    //           res.json(err);
    //         } else {
    //           for (var i = 0; i < vartotojas.objektai.length; i++) {
    //             if (vartotojas.objektai[i]._id == objektas._id) {
    //               console.log('Pažymėta' + vartotojas.objektai[i].checked);
    //               vartotojas.objektai[i].checked = true;
    //               break;
    //             }
    //           }
    //           vartotojas.save();
    //           res.redirect('back');
    //         }
    //       });
    //     }
    //   });
    // User.findOne({ sessionid: req.session.id }, (err, user) => {
    //   if (err) {
    //     res.json(err);
    //   } else {
    //     Objektas.findById(req.params.oid, (err, objektas) => {
    //       if (err) {
    //         res.json(err);
    //       } else {
    //         for (var i = 0; i < user.objektai.length; i++) {
    //           console.log(user.objektai[i]);
    //           if (user.objektai[i] == objektas._id) {
    //             console.log('Pažymėta' + user.objektai[i].checked);
    //             user.objektai[i].checked = true;
    //             break;
    //           }
    //         }
    //         user.save();
    //         res.redirect('back');
    //       }
    //     });
    //   }
    // });
    Objektas.findById(req.params.oid, (err, objektas) => {
      objektas.checked = true;
      objektas.save();
      res.redirect('back');
    });
  });
};
