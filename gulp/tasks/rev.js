'use strict';

/*******************************************************************************
 * REV TASK
 *
 * concats the rev files
 */

var gulp = require('gulp');

gulp.task('rev', function() {
  var extend = require('gulp-extend'),
    config   = require('../config'),
    paths    = config.paths;

  return gulp.src([paths.source.rev + '*.json', '!' + paths.source.rev + 'all.json'])
    .pipe(extend('all.json'))
    .pipe(gulp.dest(paths.source.rev));
});