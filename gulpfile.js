var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', shell.task([
  'webpack --watch',
  'sass --watch ./styles/admin.scss:./dist/admin.css'
]));
