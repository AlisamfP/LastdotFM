var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/circle_chart', function(req, res) {
  res.render('circle_chart', {title: 'circle chart'});
});

module.exports = router;
