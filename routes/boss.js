var express = require('express');
var request = require('request');
var router = express.Router();

var API_URL = 'https://eu.api.battle.net/wow/boss/?locale=fr_FR&apikey=tjwdytpnn8qdd546y54kb9nqczumm8aa'


/* GET home page. */
router.get('/', function(req, res, next) {
  request(API_URL, function(err, data){
      var bosses = JSON.parse(data.body);
      res.render('boss', {'data': bosses});
  });
});

module.exports = router;
