var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sass        = require('gulp-ruby-sass');
var browserify  = require('gulp-browserify');
var prefix      = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');

// Constants
var EXPRESS_PORT = 3000;

// Paths
var path         = {};
    path.assets  = 'assets';
    path.views   = 'views';
    path.styles  = path.assets + '/styles';
    path.scripts = path.assets + '/scripts';
    path.public  = 'public';
    path.css     = path.public + '/stylesheets';
    path.js      = path.public + '/javascripts';
    path.bower   = path.public + '/bower_components';

/* Stylesheets: SCSS compilation and pass through Autoprefixer */
gulp.task('scss', function () {
    gulp.src([path.styles + '/**/*.scss'])
        .pipe(plumber()) // catch errors
        .pipe(sass({
            loadPath: [path.bower],
            style: 'expanded'
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest(path.css));
});

/* Browserify */
gulp.task('browserify', function () {
    gulp.src([path.scripts + '/index.coffee'], { read: false })
        .pipe(plumber()) // catch errors
        .pipe(browserify({
            extensions: ['.coffee'],
            transform: ['coffeeify'],
            shim: require('./' + path.scripts + '/browserify-shim.json')
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(path.js));
});

/* Start the Express app */
gulp.task('server', function () {
    var app = require('./app');

    app.server.listen(app.get('port'), 'lightsaber', function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
});

/* Start Browser Sync */
gulp.task('browser-sync', ['server'], function () {
    browserSync.init([path.views + '**/*', path.css + '/**/*.css', path.js + '/**/*.js'], {
        proxy: {
            host: 'lightsaber',
            port: 3000
        }
    });
});

// Gulp watching
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.styles + '/**/*.scss', ['scss']);
    gulp.watch(path.scripts + '/**/*.coffee', ['browserify']);
});

// Gulp default task
gulp.task('default', ['scss', 'browserify', 'watch']);
