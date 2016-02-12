'use strict';

var
  gulp = require('gulp'),
  browserSync = require('../util/browserSync');


module.exports = function (name, config) {

  gulp.task(name + ':reload', function (cb) {
    browserSync.getInstance().reload(getReloadWildCards(config));
    return cb();
  });

  gulp.task(name, function (cb) {
    browserSync.getInstance().init({
      server: {
        baseDir: config.baseDir || 'public/'
      },
      notify: config.notify || false,
      open: config.open || true
    }, cb);
  });

};