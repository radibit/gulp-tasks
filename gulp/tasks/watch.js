'use strict';

var gulp  = require('gulp'),
  paths = require('../config').paths;

gulp.task('styles:watch', function () {
  gulp.watch(paths.source.styles, gulp.series('styles', 'server:reload'));
});

gulp.task('scripts:watch', function () {
  gulp.watch(paths.source.scripts, gulp.series('scripts', 'server:reload'));
});

gulp.task('images:watch', function () {
  gulp.watch(paths.source.images, gulp.series('images', 'server:reload'));
});

gulp.task('copy:watch', function () {
  gulp.watch(paths.source.copy, gulp.series('copy', 'server:reload'));
});
