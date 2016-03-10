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

    gulp.src(config.source)
      .pipe(jshint(config.jshint.options || {esnext: true}))
      .pipe(jshint.reporter(config.jshint.reporter || 'jshint-stylish'));
    // .pipe(jshint.reporter('fail'));

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
          .pipe(featureCheck.ifDest(config, gulp.dest(config.dest)))
          .pipe(featureCheck.ifWatch(config), browserSync.getInstance().stream())
          .pipe(featureCheck.ifSourceMap(config, sourcemaps.init()))
          .pipe(featureCheck.ifMinify(config, uglify()))
          .pipe(featureCheck.ifMinify(config, extReplace('.min.js')))
          .pipe(featureCheck.ifSourceMap(config, sourcemaps.write('./')))
          .pipe(featureCheck.ifMinify(config, gulp.dest(config.dest)));
      });

      es.merge(tasks).on('end', cb);
    });
  });

  gulp.task(name + ':watch', function () {
    gulp.watch(config.source, gulp.parallel(name));
  });
};