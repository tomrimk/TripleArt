const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./keys/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejsLint = require('ejs-lint');

mongoose.connect(keys.mongoDbUri);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.moment = require('moment');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(function(req, res, next) {
  res.locals.loggedUser = req.user;
  next();
});

app.use(cookieParser());

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
