var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (!req.query.userName) {
        res.render('auth', {
            title: 'home'
        });
    } else {
        res.render('index', {
            title: 'home'
        });
    }
});

module.exports = router;