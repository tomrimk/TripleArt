const User = require('../models/User');

module.exports = (app, passport) => {
  // ROOT ROUTE
  app.get('/', function(req, res) {
    res.render('../views/map.ejs', { user: req.user });
  });

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
    res.render('profile.ejs', {
      user: req.user
    });
  });

  app.put('/:id/add', (req, res) => {
    User.findById(req.params.id, req.body.user, (err, foundUser) => {
      if (err) {
        alert('Įvyko klaida');
      } else {
        res.redirect('/');
      }
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
