const MapObject = require('../models/MapObject');
const Campaign = require('../models/Campaign');
const User = require('../models/User');

module.exports = (app, passport) => {
  // NOT RELATED TO BELOW
  app.get('/campaigns', (req, res) => {
    res.render('campaigns');
  });

  // CAMPAIGN SUKŪRIMO FORMA
  app.get('/campaign/create', isLoggedIn, (req, res) => {
    res.render('campaign/createcampaign');
  });

  // CAMPAIGN SUKŪRIMAS
  app.post('/campaign/new', isLoggedIn, (req, res) => {
    Campaign.create(req.body.campaign, (err, createdCampaign) => {
      if (err) {
        res.redirect('/');
      } else {
        createdCampaign.autorius.id = req.user._id;
        createdCampaign.autorius.vardas = req.user.facebook.name;
        createdCampaign.save();
        res.redirect('/campaign/' + createdCampaign._id);
      }
    });
  });

  // CAMPAIGN KŪRIMO PARODAMOJI DALIS
  app.get('/campaign/create/:id', isLoggedIn, (req, res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('campaign/showcampaign', { campaign: foundCampaign });
      }
    });
  });

  // NAUJO CAMPAIGN SUKŪRIMAS
  app.post('/campaigns', isLoggedIn, (req, res) => {
    const lat = req.body.lattitude;
    const long = req.body.longitude;
    const pav = req.body.pavadinimas;

    var mapObj = {
      name: pav,
      lattitude: lat,
      longitude: long
    };

    MapObject.create(mapObj, (err, createdMapObject) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });

  app.get('/map', (req, res) => {
    MapObject.find({}, (err, foundCampaigns) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('map', {
          mapobjects: foundCampaigns,
          user: req.body.user
        });
      }
    });
  });

  // MAPOBJECT KŪRIMAS CAMPAIGNUI
  app.post('/campaign/:id', isLoggedIn, (req, res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        MapObject.create(req.body.mapobject, (err, newMapObject) => {
          if (err) {
            console.log(err);
            res.redirect('/');
          } else {
            foundCampaign.mapObject.push(newMapObject);
            foundCampaign.save();
            res.redirect('back');
          }
        });
      }
    });
  });

  // MapObject panaikinimas
  app.delete('/campaign/:id/:objid', isLoggedIn, (req, res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        foundCampaign.mapObject.pull(req.params.objid);
        foundCampaign.save();
        MapObject.findByIdAndRemove(req.params.objid, err => {
          if (err) {
            res.redirect('/');
          } else {
            res.redirect('/campaign/' + req.params.id);
          }
        });
      }
    });
  });

  app.get('/', (req, res) => {
    Campaign.find({}, (err, foundCampaigns) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('landing', {
          user: req.user,
          campaigns: foundCampaigns
        });
      }
    });
  });

  app.get('/campaign/:id', (req, res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('campaign/show', {
          campaign: foundCampaign,
          user: req.user
        });
      }
    });
  });

  // PLAYING CAMPAIGN
  app.get('/campaign/playing/:id', (req, res) => {
    Campaign.findById(req.params.id, (err, foundCampaign) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('campaign/playingcampaign', {
          user: req.user,
          campaign: foundCampaign
        });
      }
    });
  });

  // PASIŽYMĖJIMAS
  app.post('/user/addcampaign/:id', isLoggedIn, (req, res) => {
    Campaign.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      } else {
        const obj = {
          id: campaign,
          registered: true,
          finished: false
        };
        User.findByIdAndUpdate(req.user._id, obj, (err, user) => {
          if (err) {
            handleError(err);
          } else {
            res.redirect('/campaign/playing/' + req.params.id);
          }
        });
      }
    });
  });

  // PRIDĖTI CAMPAIGN KELIAUTOJUI
  app.put('/user/:id/addcampaign/:cid', isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        const obj = {
          id: req.params.cid,
          registered: true,
          finished: false
        };

        var yra = false;
        for (var i = 0; i < user.campaigns.length; i++) {
          if (user.campaigns[i].id == req.params.cid) {
            yra = true;
          }
        }

        if (yra) {
          res.redirect('/campaign/playing/' + req.params.cid);
        } else {
          user.campaigns.push(obj);
          user.save();
          res.redirect('/campaign/playing/' + req.params.cid);
        }
      }
    });
  });

  // PRIDĖTI mapObject keliautojui
  app.put('/user/addobject/:oid', isLoggedIn, (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        MapObject.findById(req.params.oid, (err, object) => {
          if (err) {
            res.json(err);
          } else {
            const obj = {
              id: req.params.oid
            };

            var yra = false;
            for (var i = 0; i < user.mapObjects.length; i++) {
              if (user.mapObjects[i].id == req.params.oid) {
                yra = true;
              }
            }

            if (yra) {
              res.redirect('back');
            } else {
              user.mapObjects.push(obj);
              user.save();
              res.redirect('back');
            }
          }
        });
      }
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
