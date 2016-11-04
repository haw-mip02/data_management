var express = require('express'),
    bodyParser = require('body-parser'),
    tweet = require('./routes/tweets');


var app = express();

app.use(bodyParser.json());

app.get('/tweets', tweet.findAll);
app.get('/tweets/:id', tweet.findById);
app.get('/tweets/ts/:timestamp', tweet.findByTimestamp);
app.post('/tweets', tweet.addTweets);

app.listen(3000);
console.log('Listening on port 3000...');
