const User = require('../models/User');
const MapObject = require('../models/MapObject');
const Campaign = require('../models/Campaign');
var qr = require('qr-image');
const mapCreation = require('../config/map');

module.exports = (app, passport) => {
  // ROOT ROUTE
  // app.get('/', function(req, res) {
  //   if (req.user) {
  //     var qr_svg = qr.image('Vardas: ' + req.user.facebook.name, {
  //       type: 'png'
  //     });
  //     qr_svg.pipe(
  //       require('fs').createWriteStream(req.user.facebook.name + '.png')
  //     );
  //   }
  //   res.render('../views/landing', { user: req.user });
  // });

  // AUTH
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
  );

  // AUTH CALLBACK
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  // LOGOUT
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // PROFILE
  app.get('/profile', isLoggedIn, function(req, res) {
    Campaign.find({ 'autorius.id': req.user._id }, (err, foundCampaigns) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('profile.ejs', {
          user: req.user,
          campaigns: foundCampaigns
        });
      }
    });
  });

  // MapObject NEW
  app.post('/', isLoggedIn, (req, res) => {
    var pavadinimas = req.body.name;
    var lattitude = req.body.lattitude;
    var longitude = req.body.longitude;
    var icon = req.body.icon;
    var newMapObject = {
      name: pavadinimas,
      lattitude: lattitude,
      longitude: longitude,
      icon: icon
    };
    MapObject.create(newMapObject, (err, createdMapObject) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });

  // Points
  app.put('/check', isLoggedIn, (req, res) => {
    const object = {
      facebook: {
        id: req.user.facebook.id,
        token: req.user.facebook.token,
        email: req.user.facebook.email,
        name: req.user.facebook.name,
        username: req.user.facebook.username
      },
      points: req.user.points + 5
    };
    User.findByIdAndUpdate(req.user._id, object, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('back');
      }
    });
  });

  // MAP INITIALIZATION
  app.get('/map', (req, res) => {
    MapObject.find({}, (err, mapObjects) => {
      if (err) {
        console.log(err);
      } else {
        res.render('campaign', {
          mapobjects: mapObjects,
          user: req.user
        });
      }
    });
  });

  // LANDING PAGE
  app.get('/', (req, res) => {
    Campaign.find({}, (err, allCampaigns) => {
      if (err) {
        console.log(err);
        res.redirect('/landing');
      } else {
        res.render('landing', { user: req.user, campaigns: allCampaigns });
      }
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
