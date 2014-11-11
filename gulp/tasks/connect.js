'use strict';

/*******************************************************************************
 * CONNECT TASK
 *
 * this task will start connect server including livereload
 */

var gulp = require('gulp');

gulp.task('connect', function() {
  require('gulp-connect').server({
    root       : 'public',
    livereload : true
  });
});