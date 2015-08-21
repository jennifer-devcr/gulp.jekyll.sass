var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('win-spawn');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp('jekyll',['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'app-sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/static/rimes/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('static/rimes/css'));
});

gulp.task('app-sass', function () {
    var appsPath = [
            'apps/benchmark',
            'apps/support'
        ],
        result = true;

    for(var i = 0, len = appsPath.length; i < len; i++){
        var p = appsPath[i];

        if(result){
            result = gulp.src(p + '/*.scss')
                .pipe(sass({
                    includePaths: ['scss'],
                    onError: browserSync.notify
                }))
                .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
                .pipe(gulp.dest('_site/' + p))
                .pipe(browserSync.reload({stream:true}))
                .pipe(gulp.dest(p));
        }
    }

    return result;
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch('apps/**/*.scss', ['app-sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', 'apps/**/*.html', '/static/rimes/js/*.js'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
