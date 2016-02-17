'use strict';

var
  gulp = require('gulp'),
  browserSync = require('../util/browserSync'),
  featureCheck = require('../util/featureCheck');

module.exports = function(name, config) {

  gulp.task(name, function() {
    return gulp.src(config.source)
      .pipe(featureCheck.ifDest(configgulp.dest(config.dest)))
      .pipe(featureCheck.ifWatch(config, browserSync.getInstance().stream()));
  });

  gulp.task(name+':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};