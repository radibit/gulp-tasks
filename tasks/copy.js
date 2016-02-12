'use strict';

var
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  browserSync = require('../util/browserSync'),

  isWatchEnabled = function(config) {
    return config.watch === true;
  };

module.exports = function(name, config) {

  gulp.task(name, function() {
    return gulp.src(config.source)
      .pipe(gulp.dest(config.dest))
      .pipe(gulpif(isWatchEnabled(config), browserSync.getInstance().stream()));
  });

  gulp.task(name+':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};