var express = require('express'),
    bodyParser = require('body-parser'),
    tweet = require('./routes/tweets');


var app = express();

app.use(bodyParser.json());

app.get('/tweets', tweet.findAll);
app.get('/tweets/:id', tweet.findById);
app.post('/tweets', tweet.addTweet);

app.listen(3000);
console.log('Listening on port 3000...');
