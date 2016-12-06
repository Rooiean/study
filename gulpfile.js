var gulp = require('gulp');
var path = require('path');
var shell = require('gulp-shell');
var ll   = require('gulp-ll');
var bsConfig = require("gulp-bootstrap-configurator");

ll.tasks(['lint', 'webpack:user', 'webpack:admin']);

gulp.task('webpack:build', ['webpack:user', 'webpack:admin']);

gulp.task('webpack:user', shell.task([
  'webpack --progress --proj user --env production'
]));

gulp.task('webpack:user-dev', shell.task([
  'webpack --progress --proj user --env development'
]));

gulp.task('webpack:admin', shell.task([
  'webpack --progress --proj admin --env production'
]));

gulp.task('webpack:admin-dev', shell.task([
  'webpack --progress --proj admin --env development'
]));

gulp.task('userstyle', shell.task([
  'sass --watch ./src/user/styles/user.scss:./public/styles/user.css'
]));

gulp.task('adminstyle', shell.task([
  'sass --watch ./src/admin/styles/admin.scss:./public/styles/admin.css'
]));

gulp.task('concat', function () {
  var concat = require('gulp-concat');

  return gulp.src([
    'public/vendor/intl/Intl.min.js',
    'public/vendor/lodash/dist/lodash.min.js',
    'public/vendor/underscore.string/dist/underscore.string.min.js',
    'public/vendor/jquery/dist/jquery.min.js',
    'public/vendor/superagent/superagent.min.js',
    'public/vendor/js-cookie/src/js.cookie.js',
    'public/vendor/moment/min/moment.min.js',
    'public/vendor/bootstrap/js/bootstrap.min.js',
    'public/vendor/react/react.min.js',
    'public/vendor/react/react-dom.min.js',
    'public/vendor/react-intl/dist/react-intl.min.js',
    'public/vendor/react-bootstrap/react-bootstrap.min.js'
  ])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('public/dist'));
});

gulp.task('user-style', function () {
  var sass = require('gulp-sass');
  var plumber = require('gulp-plumber');
  var minifier = require('gulp-minify-css');
  var sourcemaps = require('gulp-sourcemaps');
  var includePaths = require('node-bourbon').includePaths;

  return gulp.src('src/user/styles/user.scss')
  .pipe(plumber({ errorHandler: function (err) { console.log(err); this.emit('end'); } }))
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed', includePaths: includePaths }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('/public/styles'));
});

gulp.task('admin-style', function () {
  var sass = require('gulp-sass');
  var plumber = require('gulp-plumber');
  var minifier = require('gulp-minify-css');
  var sourcemaps = require('gulp-sourcemaps');
  var includePaths = require('node-bourbon').includePaths;

  return gulp.src('src/admin/styles/admin.scss')
    .pipe(plumber({ errorHandler: function (err) { console.log(err); this.emit('end'); } }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed', includePaths: includePaths }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/styles'));
});

gulp.task('lint', function () {
  var eslint = require('gulp-eslint');

  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['lint']);
    gulp.watch(['src/user/styles/**/*.sass', 'src/user/styles/**/*.scss'], ['user-style']);
    gulp.watch(['src/admin/styles/**/*.sass', 'src/admin/styles/**/*.scss'], ['admin-style']);
});

gulp.task('default', ['adminstyle', 'webpack:admin']);
//gulp.task('default', ['userstyle', 'adminstyle', 'webpack:user', 'webpack:admin']);
gulp.task('build', ['concat', 'user-style', 'admin-style', 'webpack:build']);
