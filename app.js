
/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express(),
    path = require('path');


// var worker = require('child_process').fork('streamer.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

require('./routes');

server = require('http').createServer(app);

var Streamer = require('./lib/streamer')(server);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
