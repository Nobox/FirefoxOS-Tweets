
/*
 * GET home page.
 */

app = require('../app');

app.get('/', function(req, res) {
  res.render('index', { title: 'FirefoxOS Tweets' });
});

require('./user');
