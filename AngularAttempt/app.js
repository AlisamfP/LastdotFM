var mongo = require('mongodb').MongoClient,
  assert = require('assert'),
  _ = require('lodash'),
  request = require('request');

var lastFmUrl = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&user=";

// Connection URL
var url = 'mongodb://104.131.35.144:27017/lastfm';

function getData(user, period, callback) {
  var api = lastFmUrl + user + "&period=" + String(period);
  console.log(api);
  request(api, function(err, res, body) {
    if (!err & res.statusCode == 200) {
      var data = JSON.parse(body)['topartists'];
      data = pluckData(data);
      callback(data, period);
    }
  });
}

function pluckData(data){
  var result = [];
  _.forEach(data.artist, function(item){
    result.push({
      rank: item['@attr'].rank,
      name: item['name'],
      playcount: _.parseInt(item['playcount'])
    });
  });
  return(result);
}

function insertData(data, period){
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection(period);
    collection.insert(data, function(err, result){
      assert.equal(err, null);
      console.log("DID IT");
    });
    db.close();
  });
}


getData('alisatrocity', 'overall', insertData);