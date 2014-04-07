$ = require('jquery')
require('jquery.animate-enhanced')

class Feed
    constructor: ->
        console.log('A feed was built')

    init: (selector) ->
        @feed = $(selector)
        @entries = @feed.find('.js-feed-entry')

        ##
        # @entries.each (i) ->
        #     $(this).attr('data-index', i)

        @slide()

    slide: ->

        socket = io.connect('http://lightsaber:3000')
        socket.on 'new_tweet', (tweet) =>
            $item = @feed.find(':first')
            amount = $item.outerHeight()

            @feed.append(@renderMessage(tweet))

            @feed.animate top: "-#{ amount + 3 }px", 1000, =>
                $item.detach()
                @feed.attr('style', '')


    renderMessage: (message)->

        date = new Date(message.created_at)

        return """
            <div class="js-feed-entry">
                <article class="fxos-tweet">
                    <div class="fxos-tweet__content">
                        <h1 class="fxos-tweet__user">#{ message.user.name }</h1>
                        <img class="fxos-tweet__avatar" src="#{ message.user.profile_image_url_https }" alt="#{ message.user.name }'s profile avatar">
                        <p>#{ message.text }</a></p>
                    </div>
                    <footer class="fxos-tweet__footer">
                        <time datetime="">#{ date.getDate() } #{ date.getMonth() } #{ date.getFullYear() }</time>
                    </footer>
                </article>
            </div>
        """

module.exports = new Feed
