const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./keys/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejsLint = require('ejs-lint');
const session = require('express-session');
const uuid = require('uuid/v4');
const passport = require('passport');

mongoose.connect(keys.mongoDbUri);

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.moment = require('moment');

app.use(
  session({
    genid: function() {
      return uuid(); // use UUIDs for session IDs
    },
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
ejsLint('/views/issukis', '-d=%');

require('./routes/issukis.js')(app);
require('./routes/objektas.js')(app);
require('./routes/index.js')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('App is running!');
});
