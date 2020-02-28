const gulp = require('gulp');
const babel = require('gulp-babel');

const build = () =>
  gulp
    .src('src/**/*')
    .pipe(babel())
    .pipe(gulp.dest('dist'));

module.exports = {
  build,
  default: build
};
