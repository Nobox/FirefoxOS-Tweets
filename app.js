/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express(),
    path = require('path');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



require('./routes');

app.server = require('http').createServer(app);

var Streamer = require('./lib/streamer')(app.server);



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
  module.exports = app;
} else {
    app.server.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
}
