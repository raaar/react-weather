var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require("gulp-open"),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    port = process.env.port || 3032,
    sass = require('gulp-sass'),
    uglyfy = require('gulp-uglify');

gulp.task('browserify', function() {
  gulp.src('./app/src/js/main.js')
      .pipe(browserify({ transform: 'reactify' }))
      .pipe(gulp.dest('./app/dist/js'));

      //.pipe(uglyfy());
});

// launch browser in a port
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };
  gulp.src('./app/index.html')
  .pipe(open('', options));
});

// live reload server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: port,
    livereload: true
  });
});

// live reload js
gulp.task('js', function () {
  gulp.src('./app/dist/**/*.js')
    .pipe(connect.reload());
});

// live reload html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./app/src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/dist/css'))
        .pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
    gulp.watch('app/dist/js/*.js', ['js']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/src/js/**/*.js', ['browserify']);
    gulp.watch('app/src/scss/style.scss', ['sass']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);