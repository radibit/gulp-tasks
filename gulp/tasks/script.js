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
    browserify   = require('gulp-browserify'),
    uglify       = require('gulp-uglify'),
    rev          = require('gulp-rev'),
    mergeStreams = require('merge-stream'),
    path         = require('path'),
    sourcemaps   = require('gulp-sourcemaps'),
    config       = require('../config'),
    paths        = config.paths;
    //stripDebug   = require('gulp-strip-debug');

  require('del')(paths.dest.scripts);

  /**
   * scripts in the js root folder, entry points for browserify only!
   */
  var browserifiedScripts = gulp.src(paths.source.scripts, {base : path.join(process.cwd(), paths.source.root)})
    .pipe(sourcemaps.init())
    .pipe(browserify(config.browserify))
  /**
   * uncomment the next line, if you want to strip out console, alert, and debugger statements
   */
    //.pipe(stripDebug())
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
