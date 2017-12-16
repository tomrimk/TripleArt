var keys = require('../keys/prod');

module.exports = {
  clientID: keys.facebookAppId, // your App ID
  clientSecret: keys.facebookAppSecret, // your App Secret
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
};
