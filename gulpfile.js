/*
 * gulpfile.js
 *
 * Windows:
 * node_modules\.bin\gulp
 * *nix:
 * node_modules/.bin/gulp
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');

// ServerSideCompile Task
gulp.task('servercompile', function () {
  gulp.src(['src/**/*.js'])
    .pipe(shell(['node node_modules/traceur/traceur --out tmp/server/app.compiled.js src/app.js']));
});

// ServerSideConcat Task
gulp.task('serverconcat', function () {
  gulp.src(['node_modules/traceur/bin/traceur-runtime.js', 'tmp/server/app.compiled.js'])
    .pipe(concat('application.js'))
    .pipe(gulp.dest('bin'));
});

// ClientSideCompile Task
gulp.task('clientjs', function () {
  gulp.src(['webroot/**/*.js'])
    .pipe(shell(['node ../../../node_modules/traceur/traceur --out app.compiled.js app.js'],{cwd: 'webroot/js/app', }));
});

// ClientSideCompress Task
gulp.task('clientcompress', function () {
  gulp.src('webroot/js/app/app.compiled.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('webroot/js/app/'));
});

// ClientCSS Task
gulp.task('clientcss', function () {
  gulp.src(['webroot/**/*.scss'])
    .pipe(shell(['sass webroot/scss/style.scss:webroot/css/style.min.css --compass --style compressed --cache-location tmp/.sass-cache -E UTF-8']));
});

// traceur-runtime copy to clientlibs Task
gulp.task('traceurruntime', function () {
  gulp.src(['node_modules/traceur/bin/traceur-runtime.js'])
    .pipe(gulp.dest('webroot/js/libs/'));
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['servercompile'])
  gulp.watch('tmp/server/**/*.js', ['serverconcat'])
  gulp.watch(['webroot/**/*.js', '!webroot/**/*.compiled.js', '!webroot/**/*.compiled.min.js'], ['clientjs'])
  gulp.watch('webroot/js/app/app.compiled.js', ['clientcompress'])
  gulp.watch('webroot/**/*.scss', ['clientcss'])
});
  
// default Task
gulp.task('default', ['servercompile', 'serverconcat', 'clientjs', 'clientcompress', 'clientcss', 'traceurruntime', 'watch']);
