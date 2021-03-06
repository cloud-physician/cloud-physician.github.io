var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    deploy = require('gulp-gh-pages'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    normalize = require('node-normalize-scss').includePaths;

var paths = {
    scss: './assets/sass/*.scss'
};

var DEPLOY_OPTIONS = {
    remoteUrl: 'git@github.com:cloud-physician/cloud-physician.github.io.git'
};

gulp.task('clean', function (cb) {
    return del([
        './build/**/*'
    ]);
});

gulp.task('css', function () {
    gulp.src('app/styles/*.scss')
        .pipe(plumber(''))
        .pipe(autoprefixer())
        .pipe(sass({
            includePaths: ['styles'].concat(neat).concat(normalize)
        }))
        .pipe(gulp.dest('./build/styles'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('app/*.jade')
        .pipe(plumber(''))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(['app/scripts/**/*', '!gulpfile.js'])
        .pipe(plumber(''))
        .pipe(gulp.dest('./build/scripts'))
        .pipe(connect.reload());
});

gulp.task('assets', function() {
    gulp.src(['app/assets/**/*'])
        .pipe(plumber(''))
        .pipe(gulp.dest('./build/assets'))
        .pipe(connect.reload());
});


// gulp.task('appcache', function () {
//     gulp.src('app/*.appcache')
//         .pipe(gulp.dest('./build'))
//         .pipe(connect.reload());
// })

gulp.task('config', function() {
    gulp.src(['app/config/**/*'])
        .pipe(plumber(''))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('app/styles/**/*', ['css']);
  gulp.watch('app/scripts/*.js', ['js']);
  gulp.watch('app/assets/*', ['assets']);
  gulp.watch('app/**/*.jade', ['html']);
  watch('./build/**/*').pipe(connect.reload());
});

gulp.task('serve', ['clean', 'build'], function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 3001
  });
});

gulp.task('deploy', function () {
    gulp.src(['./build/**/*', './build/*'])
       .pipe(gulp.dest('./'));
});

gulp.task('build', ['html', 'css', 'js', 'assets', 'config']);

gulp.task('default', ['serve', 'watch']);