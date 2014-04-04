var twitter = require('twitter'),
    habitat = require('habitat');

var env = habitat.load('.env'),
    twit = new twitter({
        consumer_key: env.get('consumer_key'),
        consumer_secret: env.get('consumer_secret'),
        access_token_key: env.get('access_token'),
        access_token_secret: env.get('access_token_secret')
    });

function Streamer(server) {

    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
        twit.stream('statuses/filter', { track: '#NFCEastBest' }, function(stream) {
            stream.on('data', function(tweet) {
                socket.emit('new_tweet', tweet);
            });
        });
    });

}

module.exports = Streamer;
