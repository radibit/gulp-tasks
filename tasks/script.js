'use strict';

var
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  path = require('path'),
  gutil = require('gutil'),
  extReplace = require('gulp-ext-replace'),
  browserSync = require('../util/browserSync'),
  featureCheck = require('../util/featureCheck');

module.exports = function (name, config) {

  gulp.task(name, function () {

    gulp.src(config.source)
      .pipe(jshint(config.jshint.options || {esnext: true}))
      .pipe(jshint.reporter(config.jshint.reporter || 'jshint-stylish'));
    // .pipe(jshint.reporter('fail'));

    return browserify({entries: config.entries})
      .bundle()
      .on('error', gutil.log)
      .pipe(source(config.bundleName || 'bundle.js'))
      .pipe(buffer())
      .pipe(featureCheck.ifHook(config, config.hook)
      .pipe(featureCheck.ifDest(config, gulp.dest(config.dest)))
      .pipe(featureCheck.ifWatch(config), browserSync.getInstance().stream()))
      .pipe(featureCheck.ifSourceMap(config, sourcemaps.init()))
      .pipe(featureCheck.ifMinify(config, uglify()))
      .pipe(featureCheck.ifMinify(config, extReplace('.min.js')))
      .pipe(featureCheck.ifSourceMap(config, sourcemaps.write('./')))
      .pipe(featureCheck.ifWatch(config, gulp.dest(config.dest)));
  });

  gulp.task(name + ':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};