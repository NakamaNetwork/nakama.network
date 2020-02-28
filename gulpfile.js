const gulp = require('gulp');

const build = () => gulp.src('src/**/*').pipe(gulp.dest('dist'));

module.exports = {
  build,
  default: build
};
