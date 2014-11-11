'use strict';

/*******************************************************************************
 * BUILD TASK
 *
 * run all build related tasks with:
 *
 *  $ gulp build
 *
 */

var gulp = require('gulp');

gulp.task('build', function() {
  require('run-sequence')(
    'sprite',
    ['scripts', 'images', 'styles'],
    'rev',
    'template',
    'size'
  );
});