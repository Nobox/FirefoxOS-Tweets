$ = require('jquery')
feed = require('./lib/feed')

$(document).ready ->
    feed.init('#fxos-feed')