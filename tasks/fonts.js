'use strict';

var
  gulp = require('gulp'),
  font64 = require('gulp-simplefont64'),
  concat = require('gulp-concat'),
  browserSync = require('../util/browserSync'),
  featureCheck = require('../util/featureCheck');

module.exports = function(name, config) {

  gulp.task(name, function() {
    return gulp.src(config.source)
      .pipe(font64())
      .pipe(featureCheck.ifConcat(config, concat(config.targetFile)))
      .pipe(featureCheck.ifDest(config, gulp.dest(config.dest)))
      .pipe(featureCheck.ifWatch(config, browserSync.getInstance().stream()));
  });

  gulp.task(name+':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};