var express = require('express');
var router = express.Router();
var User = require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Foodgo' });
});

module.exports = router;
