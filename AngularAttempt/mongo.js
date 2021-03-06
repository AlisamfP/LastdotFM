var mongo = require('mongodb').MongoClient,
  assert = require('assert'),
  _ = require('lodash'),
  request = require('request');

function init(){
  var authUrl = 'http://www.last.fm/api/auth/?api_key' + process.env.API_KEY
  $('.auth').on('click', function(){
    request(authUrl, function(err, res, body){
      if(!err & res.statusCode==200){
        
      }
    })
}

function getData(user, period, callback) {
  var lastFmUrl = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key=" + process.env.API_KEY + "&format=json&user=";
  var api = lastFmUrl + user + "&period=" + String(period);
  request(api, function(err, res, body) {
    if (!err & res.statusCode == 200) {
      var data = JSON.parse(body)['topartists'];
      data = pluckData(data);
      period = (period === "overall") ? period : convert[period];
      callback(data, period);
    }
  });
}

function pluckData(data) {
  var result = [];
  _.forEach(data.artist, function(item) {
    result.push({
      rank: item['@attr'].rank,
      name: item['name'],
      playcount: _.parseInt(item['playcount'])
    });
  });
  return (result);
}

function insertData(data, period) {
  var url = 'mongodb://104.131.35.144:27017/lastfm';
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection(period);
    collection.insert(data, function(err, result) {
      assert.equal(err, null);
      console.log("DID IT");
    });
    db.close();
  });
}

var convert = {
  "7day": "oneWeek",
  "1month": "oneMonth",
  "3month": "threeMonths",
  "6month": "sixMonths",
  "12month": "oneYear"
};

function addDatas() {
  getData('alisatrocity', 'overall', insertData);
  getData('alisatrocity', '7day', insertData);
  getData('alisatrocity', '1month', insertData);
  getData('alisatrocity', '3month', insertData);
};