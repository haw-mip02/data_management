var express = require('express'),
    bodyParser = require('body-parser'),
    wine = require('./routes/wines'),
    tweet = require('./routes/tweets');


var app = express();

app.use(bodyParser.json());

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

app.get('/tweets', tweet.findAll);
app.get('/tweets/:id', tweet.findById);
app.post('/tweets', tweet.addTweet);

app.listen(3000);
console.log('Listening on port 3000...');
