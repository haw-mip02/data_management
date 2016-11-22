var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('mongo', 27017, {auto_reconnect: true});
db = new Db('tweetdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'tweetdb' database");
	//db.collection.createIndex({timestamp_ms: 1});
        db.collection('tweets', {strict:true}, function(err, collection) {
            if (err) {
                //console.log("The 'tweets' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving tweet: ' + id);
    db.collection('tweets', function(err, collection) {
	if(err) {
                res.status(404).send({'Error 404': err});
		console.log("ERROR OCCURED: " + err);
	} else {
		collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
		    res.send(item);
		});
	}
    });
};

exports.findByTimestamp = function(req, res) {
    var ts = req.params.timestamp;
    console.log('Retrieving tweets not older than ' + ts);
    db.collection('tweets', function(err, collection) {
	//TODO: check for greater equal on timestamp
        collection.find({timestamp_ms: {$gt: ts}}).toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.findAll = function(req, res) {
    //if(process.env.DB_ACCESS_TOKEN === "RGFzIEFzb3ppYWxlIE5ldHp3ZXJr") {
      console.log('retrieving all tweets');
      db.collection('tweets', function(err, collection) {
          if(err) {
                  console.log(err);
          } else {
                  collection.find().limit(100).toArray(function(err, items) {
                      res.send(items);
                  });
          }
      });
    //}
};

exports.addTweets = function(req, res) {
    console.log(req);
    var tweets = req.body;
    console.log('Adding tweets: ' + tweets + '\n');
    db.collection('tweets', function(err, collection) {
        if (err) {
            res.status(500).send({'Collection Error 500': err});
            console.log(err)
        } else {
          try {
            collection.insertMany(tweets, {safe:true}, function(err, result) {
                if (err) {
                    res.status(500).send({'Insert Error 500': err});
                    console.log(err);
                } else {
                    res.send(result[0]);
                    console.log('addTweet: SUCCESS')
                }
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
}

// /*--------------------------------------------------------------------------------------------------------------------*/
// // Populate database with sample data -- Only used once: the first time the application is started.
// // You'd typically not find this code in a real-life app, since the database would already exist.
// var populateDB = function() {
//
//     var tweets =
//     [
//       {
//       	"created_at": "Sat Oct 15 10:48:01 +0000 2016",
//       	"id": 787243627135336400,
//       	"id_str": "787243627135336452",
//       	"text": "Wer von euch war das?! 🤔\n😂😂😂😂😂😂😂😂😂😂\nhttps://t.co/IQ2o4Adk0s",
//       	"source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
//       	"truncated": false,
//       	"in_reply_to_status_id": null,
//       	"in_reply_to_status_id_str": null,
//       	"in_reply_to_user_id": null,
//       	"in_reply_to_user_id_str": null,
//       	"in_reply_to_screen_name": null,
//       	"user": {
//       		"id": 814559108,
//       		"id_str": "814559108",
//       		"name": "Susi",
//       		"screen_name": "Susi_1887",
//       		"location": "Hamburg, Germany",
//       		"url": "http://susisgedankenscheiss.wixsite.com/meinewebsite",
//       		"description": "NUR DER HSV!//Hamburg Hannover Bielefeld// RangersFC&LFC//NY Knicks//\nIronie//Zynismus//\nMSc Geographie",
//       		"protected": false,
//       		"verified": false,
//       		"followers_count": 1205,
//       		"friends_count": 678,
//       		"listed_count": 82,
//       		"favourites_count": 71095,
//       		"statuses_count": 57140,
//       		"created_at": "Mon Sep 10 05:55:01 +0000 2012",
//       		"utc_offset": 7200,
//       		"time_zone": "Bern",
//       		"geo_enabled": true,
//       		"lang": "de",
//       		"contributors_enabled": false,
//       		"is_translator": false,
//       		"profile_background_color": "C0DEED",
//       		"profile_background_image_url": "http://pbs.twimg.com/profile_background_images/674632697/8f55495cd5c032001525741edc03fac9.jpeg",
//       		"profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/674632697/8f55495cd5c032001525741edc03fac9.jpeg",
//       		"profile_background_tile": true,
//       		"profile_link_color": "0084B4",
//       		"profile_sidebar_border_color": "FFFFFF",
//       		"profile_sidebar_fill_color": "DDEEF6",
//       		"profile_text_color": "333333",
//       		"profile_use_background_image": true,
//       		"profile_image_url": "http://pbs.twimg.com/profile_images/760882943845888001/Redc7VqB_normal.jpg",
//       		"profile_image_url_https": "https://pbs.twimg.com/profile_images/760882943845888001/Redc7VqB_normal.jpg",
//       		"profile_banner_url": "https://pbs.twimg.com/profile_banners/814559108/1437376641",
//       		"default_profile": false,
//       		"default_profile_image": false,
//       		"following": null,
//       		"follow_request_sent": null,
//       		"notifications": null
//       	},
//       	"geo": null,
//       	"coordinates": null,
//       	"place": {
//       		"id": "5bcd72da50f0ee77",
//       		"url": "https://api.twitter.com/1.1/geo/id/5bcd72da50f0ee77.json",
//       		"place_type": "city",
//       		"name": "Hamburg",
//       		"full_name": "Hamburg, Deutschland",
//       		"country_code": "DE",
//       		"country": "Deutschland",
//       		"bounding_box": {
//       			"type": "Polygon",
//       			"coordinates": [
//       				[
//       					[
//       						8.42016,
//       						53.395118
//       					],
//       					[
//       						8.42016,
//       						53.964655
//       					],
//       					[
//       						10.325199,
//       						53.964655
//       					],
//       					[
//       						10.325199,
//       						53.395118
//       					]
//       				]
//       			]
//       		},
//       		"attributes": {}
//       	},
//       	"contributors": null,
//       	"is_quote_status": false,
//       	"retweet_count": 0,
//       	"favorite_count": 0,
//       	"entities": {
//       		"hashtags": [],
//       		"urls": [
//       			{
//       				"url": "https://t.co/IQ2o4Adk0s",
//       				"expanded_url": "https://youtu.be/feBkqdzAioc",
//       				"display_url": "youtu.be/feBkqdzAioc",
//       				"indices": [
//       					36,
//       					59
//       				]
//       			}
//       		],
//       		"user_mentions": [],
//       		"symbols": []
//       	},
//       	"favorited": false,
//       	"retweeted": false,
//       	"possibly_sensitive": false,
//       	"filter_level": "low",
//       	"lang": "de",
//       	"timestamp_ms": "1476528481645"
//       }
//     ];
//
//     db.collection('tweets', function(err, collection) {
//         collection.insert(tweets, {safe:true}, function(err, result) {});
//     });
//
// };
