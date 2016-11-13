var ja = require('json-assert');
var routes = require('../routes/tweets.js');
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


var server = new Server('mongo', 27017, {auto_reconnect: true});
db = new Db('tweetdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'tweetdb' database");
        db.collection('tweets', {strict:true}, function(err, collection) {
            if (err) {
                //console.log("The 'tweets' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

function test_insert_into_db() {
  db = new Db('tweetdb', server);

  var expected_tweet = {
    "created_at": "Sat Oct 15 10:48:01 +0000 2016",
    "id": 123456,
    "weitere": "felder",
    "lang": "de",
    "timestamp_ms": "1476528481645"
  }

  var result = routes.addTweets(expected_tweet);

  console.log(result);

}
