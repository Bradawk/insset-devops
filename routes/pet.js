var express = require('express');
var request = require('request');
var router = express.Router();

var API_URL = 'https://eu.api.battle.net/wow/pet/?locale=fr_FR&apikey=tjwdytpnn8qdd546y54kb9nqczumm8aa'


/* GET home page. */
router.get('/', function(req, res, next) {
  request(API_URL, function(err, data){
      var pets = JSON.parse(data.body);
      res.render('pet', {'data': pets});
  });
});

module.exports = router;
