var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/bar_chart', function(req, res) {
    res.render('bar_chart', {
        title: 'bar chart'
    });
});

module.exports = router;