'use strict';

var
  gulp = require('gulp'),
  gzip = require('gulp-gzip'),
  featureCheck = require('../util/featureCheck');

module.exports = function(name, config) {

  gulp.task(name, function() {
    return gulp.src(config.source)
      .pipe(gzip())
      .pipe(featureCheck.ifDest(config, gulp.dest(config.dest)))
  });
};