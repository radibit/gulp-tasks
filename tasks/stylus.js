'use strict';

var
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  concat = require('gulp-concat'),
  cssnano = require('gulp-cssnano'),
  prefix = require('gulp-autoprefixer'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpif = require('gulp-if'),
  browserSync = require('../util/browserSync'),

  isMinifyEnabled = function(config) {
    if (isWatchEnabled(config) === true) return false;
    return config.minify === true;
  },

  isSourceMapsEnabled = function(config) {
    if (isMinifyEnabled(config) === false) return false;
    return config.sourcemaps === true;
  },

  isWatchEnabled = function(config) {
    return config.watch === true;
  },

  concatEnabled = function(config) {
    return 'string' === typeof config.targetFile;
  };


module.exports = function (name, config) {

  gulp.task(name, function () {

    return gulp.src(config.source, {base: config.base})
      .pipe(gulpif(isSourceMapsEnabled(config), sourcemaps.init()))
      .pipe(stylus(config.stylusOptions || {}))
      .pipe(gulpif(concatEnabled(config), concat(config.targetFile)))
      .pipe(gulpif(isMinifyEnabled(config), cssnano()))
      .pipe(prefix(config.prefixOptions || {browsers: ['> 1%', 'last 1 versions'], cascade: false}))
      .pipe(gulpif(isSourceMapsEnabled(config), sourcemaps.write('./')))
      .pipe(gulp.dest(config.dest))
      .pipe(gulpif(isWatchEnabled(config), browserSync.getInstance().stream()));
  });

  gulp.task(name+':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};