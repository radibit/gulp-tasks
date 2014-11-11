'use strict';

/*******************************************************************************
 * SIZE TASK
 *
 * this task will show you file sizes after build process
 */

var gulp = require('gulp');

gulp.task('size' , function() {
  var gutil = require('gulp-util'),
    paths   = require('../config').paths,
    size    = require('gulp-size');

  gutil.log('***********************************');
  gutil.log('--> current file sizes not gzipped: ');

  return gulp.src([paths.dest.root + '**/*', '!' + paths.dest.root + '**/*.map'])
    .pipe(size({ showFiles : true }))
    .pipe(gulp.dest(paths.dest.root));
});