'use strict';

var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  prefix = require('gulp-autoprefixer'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('../util/browserSync'),
  featureCheck = require('../util/featureCheck');

module.exports = function (name, config) {

  gulp.task(name, function () {

    return gulp.src(config.source, {base: config.base})
      .pipe(featureCheck.ifSourceMap(config, sourcemaps.init()))
      .pipe(sass(config.sassOptions || {includePaths: [config.base]}))
      .pipe(prefix(config.prefixOptions || {browsers: ['> 1%', 'last 1 versions'], cascade: false}))
      .pipe(featureCheck.ifHook(config, config.hook))
      .pipe(featureCheck.ifMinify(config, cssnano()))
      .pipe(featureCheck.ifSourceMap(config, sourcemaps.write('./')))
      .pipe(featureCheck.ifDest(config, gulp.dest(config.dest)))
      .pipe(featureCheck.ifWatch(config, browserSync.getInstance().stream()));
  });

  gulp.task(name + ':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};