
/*
 * GET home page.
 */

app = require('../app');

app.get('/', function(req, res) {

    env = require('habitat').load('.env');
    Datastore = require('nedb');
    var db = new Datastore({ filename: 'db/' + env.get('search_query') });
    db.loadDatabase(function(err) {

        db.find({}).sort({ created_at: -1 }).limit(5).exec(function(err, tweets) {
            res.render('index', { title: 'FirefoxOS Tweets', tweets : tweets });
        });
    });
});

require('./user');
