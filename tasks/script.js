'use strict';

var
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  flatten = require('gulp-flatten'),
  glob = require('glob'),
  path = require('path'),
  gutil = require('gutil'),
  extReplace = require('gulp-ext-replace'),
  es = require('event-stream'),
  browserSync = require('../util/browserSync'),
  featureCheck = require('../util/featureCheck');

module.exports = function (name, config) {

  gulp.task(name, function (cb) {

    if (config.jshint !== false) {
      gulp.src(config.source)
        .pipe(jshint(config.jshint.options || {esnext: true}))
        .pipe(jshint.reporter(config.jshint.reporter || 'jshint-stylish'));
      // .pipe(jshint.reporter('fail'));
    }
    glob(config.entries, function (err, files) {
      if (err) done(err);

      var tasks = files.map(function (entry) {

        return browserify({entries: entry})
          .bundle()
          .on('error', gutil.log)
          .pipe(source(entry))
          .pipe(buffer())
          .pipe(featureCheck.ifHook(config, config.hook))
          .pipe(extReplace('.bundle.js'))
          .pipe(flatten())
          .pipe(featureCheck.ifSourceMap(config, sourcemaps.init()))
          .pipe(featureCheck.ifMinify(config, uglify()))
          .pipe(featureCheck.ifSourceMap(config, sourcemaps.write('./')))
          .pipe(featureCheck.ifDest(config, gulp.dest(config.dest)));
      });

      es.merge(tasks).on('end', function() {

          if (config.watch === true) {
            browserSync.getInstance().reload();
          }

          if (typeof cb === 'function') {
            cb();
          }
        });
    });
  });

  gulp.task(name + ':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};