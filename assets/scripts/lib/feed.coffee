$ = require('jquery')
require('jquery.animate-enhanced')

class Feed
    constructor: ->
        console.log('A feed was built')

    init: (selector) ->
        @feed = $(selector)
        @entries = @feed.find('.js-feed-entry')
        @slideAmount = 0

        ##
        @entries.each (i) ->
            $(this).attr('data-index', i)

        @slide()

    slide: ->
        setTimeout =>
            $item = @feed.find(':first')
            amount = $item.outerHeight()

            @feed.animate top: "-#{ amount + 3 }px", 1000, =>
                $item.detach().appendTo(@feed)
                @feed.attr('style', '')

            requestAnimationFrame =>
                @slide()

        , 5000



module.exports = new Feed