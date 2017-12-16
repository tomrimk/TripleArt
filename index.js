const express = require('express');
const app = express();
const mongoose = require('mongoose');
var passport = require('passport');
const keys = require('./keys/prod');

mongoose.connect(keys.mongoDbUri);

require('./config/passport')(passport);

app.configure(function() {
  // set up our express application
  app.use(express.logger('dev')); // log every request to the console
  app.use(express.cookieParser()); // read cookies (needed for auth)
  app.use(express.bodyParser()); // get information from html forms
  app.use(express.static(__dirname + '/public'));

  app.set('view engine', 'ejs'); // set up ejs for templating

  // required for passport
  app.use(express.session({ secret: 'tripleartslovesakimirka' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
});

require('./routes/index.js')(app, passport);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('App is running!');
});
