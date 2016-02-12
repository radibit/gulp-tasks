'use strict';

var
  gulp = require('gulp'),
  del = require('del');

module.exports = function(name, config) {

  gulp.task(name, function() {
    return del(config.dir);
  });
};