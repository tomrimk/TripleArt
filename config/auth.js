var keys = require('../keys/prod');

module.exports = {
  clientID: keys.facebookAppId, // your App ID
  clientSecret: keys.facebookAppSecret, // your App Secret
  callbackURL: '/auth/facebook/callback'
};
