var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/bubble_chart', function(req, res) {
    res.render('bubble_chart', {
        title: 'bubble chart'
    });
});

module.exports = router;