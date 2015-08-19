'use strict';

var gulp = require('gulp'),
  paths = require('../config').paths;

gulp.task('copy', function() {
  return gulp.src(paths.source.copy)
    .pipe(gulp.dest(paths.dest));
});
