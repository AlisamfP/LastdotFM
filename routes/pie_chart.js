var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/pie_chart', function(req, res) {
    res.render('pie_chart', {
        title: 'pie chart'
    });
});

module.exports = router;