'use strict';

var
  gulp = require('gulp'),
  patternguide = require('gulp-patternguide'),
  browserSync = require('../util/browserSync'),

  getWatchGlobString = function (config) {
    return config.patterns.sourcePath +
      '/**/*.{' +
      (config.patterns.sourceExt || 'twig') +
      ',' +
      (config.patterns.dataExt || 'json') +
      '}';
  },

  getReloadWildCards = function (config) {
    return [
      '*.'+ (config.patterns.targetExt || 'html'),
      '*.'+ (config.patterns.dataExt || 'json')
      ];
  };

module.exports = function (name, config) {
  gulp.task(name + ':reload', function (cb) {
    browserSync.getInstance().reload(getReloadWildCards(config));
    return cb();
  });

  gulp.task(name+':dev', function () {
    patternguide(config, browserSync.getInstance());
    gulp.watch(getWatchGlobString(config), gulp.parallel(name + ':reload'));
  });

  gulp.task(name+':build', function (cb) {
    return patternguide(config, null, cb);
  });

};