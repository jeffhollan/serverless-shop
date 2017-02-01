var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var concat = require('gulp-concat');

var config = {
    sassPath: './assets/styles',
    jsPath: './assets/scripts',
    bowerDir: './bower_components'
}

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('fonts', ['bower'], function(){
    return gulp.src('./bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest('./dist/fonts/bootstrap'));
});

gulp.task('icons', ['bower'], function () {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('styles', ['bower'], function () {
    return gulp.src('assets/styles/*.scss')
        .pipe(sass(({
            style: 'compressed',
            includePaths: [
                './bower_components/bootstrap-sass-official/assets/stylesheets',
                './bower_components/font-awesome/scss'
            ]
        })).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', ['minScripts'], function () {
   
    return gulp.src(config.jsPath + '/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js/'));


});

gulp.task('minScripts', ['bower'], function () {
     return gulp.src(['./bower_components/jquery/dist/*.min.js', './bower_components/bootstrap-sass-official/assets/javascripts/*.min.js'])
        .pipe(concat('min.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', ['default'], function () {
    browserSync.init({
        server: {
            baseDir: "./",
            reloadDelay: 250
        }
    });
    gulp.watch(config.jsPath + '/**.js', ['scripts']);
    gulp.watch(config.sassPath + '/**.scss', ['styles']);
    gulp.watch(['*.html', './dist/js/*.js', './dist/css/*.css']).on("change", browserSync.reload);
});

gulp.task('default', ['bower', 'icons', 'styles', 'scripts', 'fonts']);