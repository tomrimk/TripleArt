const MapObject = require('../models/MapObject');
const Campaign = require('../models/Campaign');

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
            res.redirect('/campaign/' + req.params.id);
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
          user: req.body.user,
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
          user: req.body.user
        });
      }
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
