const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('../keys/keys');

// load up the user model
const Vartotojas = require('../models/Vartotojas');

module.exports = passport => {
  passport.serializeUser(function(vartotojas, done) {
    done(null, vartotojas.id);
  });

  passport.deserializeUser(function(id, done) {
    Vartotojas.findById(id, function(err, vartotojas) {
      done(err, vartotojas);
    });
  });

  passport.use(
    new FacebookStrategy({
      vartotojoID: keys.facebookAppId,
      vartotojoSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback'
    })
  ),
    (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        Vartotojas.findOne({ 'facebook.id': profile.id }, (err, vartotojas) => {
          if (err) return done(err);

          if (vartotojas) {
            return done(null, vartotojas);
          } else {
            var naujasVartotojas = new Vartotojas();

            naujasVartotojas.facebookId = profile.id;
            naujasVartotojas.token = token;
            naujasVartotojas.vardas =
              profile.name.givenName + ' ' + profile.name.familyName;
            naujasVartotojas.email = profile.emails[0].value;

            newUser.save(err => {
              if (err) throw err;

              return done(null, naujasVartotojas);
            });
          }
        });
      });
    };
};
