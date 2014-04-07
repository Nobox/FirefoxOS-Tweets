var twitter = require('twitter'),
    habitat = require('habitat');

var env = habitat.load('.env'),
    twit = new twitter({
        consumer_key: env.get('consumer_key'),
        consumer_secret: env.get('consumer_secret'),
        access_token_key: env.get('access_token'),
        access_token_secret: env.get('access_token_secret')
    });

Datastore = require('nedb');
var db = new Datastore({ filename: 'db/' + env.get('search_query') });
db.loadDatabase();

function Streamer(server) {

    self = this;

    //Queue to contain the tweets to be sent to the feed.
    this.queue = [];

    var io = require('socket.io').listen(server);

    //We initialize the interval that determines how fast we want to render tweets in the feed.
    setInterval(function(){
        // If no tweets, no tweet is sent
        if(self.queue.length){
            var tweet = self.queue.shift();
            io.sockets.emit('new_tweet', tweet);
        }
    }, env.get('render_interval'));

    twit.stream('statuses/filter', { track: env.get('search_query') }, function(stream) {
        stream.on('data', function(tweet) {
            self.queue.push(tweet);
            db.insert(tweet, function(err, newtweet) {
                console.log(newtweet);
            });
        });
    });
}

module.exports = Streamer;
