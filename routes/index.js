var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (req.query.userName) {
        res.render('index', {
            title: 'home',
            user: req.query.userName
        });
    } else {
        res.render('auth', {
            title: 'home'
        });
    }
});

module.exports = router;