var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;
var req = require('request');
var _ = require('lodash');

function getData(period, callback){
var apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&period=' + period + '&limit=50';
  req.get(apiUrl, function (err, res, body){
    if(!err && res.statusCode==200){
      var info = JSON.parse(body)['topartists'];
      info = filter(info.artist);
      callback(info, period);
    }
  })
};
function filter(array){
  var result = [];
  _.forEach(array, function(item){
    result.push({name: item['name'], playcount: parseInt(item['playcount'])});
  });
  return result;
};

getData('overall', addDataToMongo);
getData('7day', addDataToMongo);
getData('1month', addDataToMongo);
getData('3month', addDataToMongo);

function addDataToMongo(data, period){
  MongoClient.connect('mongodb://127.0.0.1:27017/lastdotfm', function(err, db) {
    if(err) throw err;

    var collection = db.collection(period);
    collection.insert(data, function(err, docs) {

      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });
    });
  })
};