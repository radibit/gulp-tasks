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
  };


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
      .pipe(gulp.dest(config.dest))
      .pipe(gulpif(isWatchEnabled(config), browserSync.getInstance().stream()))
      .pipe(gulpif(isSourceMapsEnabled(config), sourcemaps.init()))
      .pipe(gulpif(isMinifyEnabled(config), uglify()))
      .pipe(gulpif(isMinifyEnabled(config), extReplace('.min.js')))
      .pipe(gulpif(isSourceMapsEnabled(config), sourcemaps.write('./')))
      .pipe(gulpif(isMinifyEnabled(config), gulp.dest(config.dest)));
  });

  gulp.task(name+':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};