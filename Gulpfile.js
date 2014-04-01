var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var prefix      = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');

// Constants
var EXPRESS_PORT = 3000;

// Paths
var path        = {};
    path.assets = 'assets';
    path.views  = 'views';
    path.scss   = path.assets + '/scss';
    path.public = 'public';
    path.css    = path.public + '/stylesheets';
    path.bower   = path.public + '/bower_components'

/* Stylesheets: SCSS compilation and pass through Autoprefixer */
gulp.task('scss', function () {
    gulp.src([path.scss + '/**/*.scss'])
        .pipe(plumber()) // catch errors
        .pipe(sass({
            loadPath: [path.bower],
            style: 'expanded'
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest(path.css));
});

/* Start the Express app */
gulp.task('server', function () {
    var app = require('./app');
    app.listen(EXPRESS_PORT, 'lightsaber');
});

/* Start Browser Sync */
gulp.task('browser-sync', ['server'], function () {
    browserSync.init([path.views + '**/*', path.css + '/**/*.css'], {
        proxy: {
            host: 'lightsaber',
            port: 3000
        }
    });
});

// Gulp watching
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.scss + '/**/*.scss', ['scss']);
});

// Gulp default task
gulp.task('default', ['scss', 'watch']);
