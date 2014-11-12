'use strict';

/*******************************************************************************
 * JSHINT TASK
 *
 * this task will validate gulpfile and all JS in assets for JSHINT errors
 */

var gulp = require('gulp');

gulp.task('jshint', function() {
  var jshint = require('gulp-jshint'),
    paths    = require('../config').paths;

  return gulp.src(paths.jshint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});