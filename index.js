const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./keys/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoDbUri);

require('./config/passport')(passport);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

require('./routes/index.js')(app, passport);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('App is running!');
});
