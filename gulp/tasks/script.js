'use strict';

/*******************************************************************************
 * SCRIPT TASKS
 *
 * this task is responsible for the JavaScript files
 * - delete old generated files
 * - concatenate all files
 * - hash the files
 * - write source maps
 */

var gulp = require('gulp');

gulp.task('scripts', function() {
  var concat     = require('gulp-concat'),
    browserify   = require('browserify'),
    transform    = require('vinyl-transform'),
    uglify       = require('gulp-uglify'),
    rev          = require('gulp-rev'),
    mergeStreams = require('merge-stream'),
    path         = require('path'),
    sourcemaps   = require('gulp-sourcemaps'),
    config       = require('../config'),
    paths        = config.paths;

  require('del')(paths.dest.scripts);

  /**
   * scripts in the js root folder, entry points for browserify only!
   */
  var browserified = transform(function(filename) {
    return browserify(filename).bundle();
  });

  var browserifiedScripts = gulp.src(paths.source.scripts, {base : path.join(process.cwd(), paths.source.root)})
    .pipe(sourcemaps.init())
    .pipe(browserified)
    .pipe(uglify())
    .pipe(rev())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.root))
    .pipe(rev.manifest({path: 'js.json'}))
    .pipe(gulp.dest(paths.source.rev));

  /**
   * scripts from vendor folder, being concatenated into one revisioned file
   */
  var vendorScripts = gulp.src(paths.source.scripts_vendor)
    .pipe(sourcemaps.init())
    .pipe(concat('js/vendor.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.root))
    .pipe(rev.manifest({path: 'js-vendor.json'}))
    .pipe(gulp.dest(paths.source.rev));

  return mergeStreams(browserifiedScripts, vendorScripts);
});
