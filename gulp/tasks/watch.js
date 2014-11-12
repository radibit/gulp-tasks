'use strict';

/*******************************************************************************
 * WATCH TASK
 *
 * kicks off the watcher for JS, CSS, HTML files
 * for easy and instant development
 *
 * @todo: use files argument to just update touched files!
 */

var gulp = require('gulp');

gulp.task('watch', function() {
  var runSequence = require('run-sequence'),
    watch         = require('gulp-watch'),
    paths         = require('../config').paths;

  gulp.watch([paths.source.styles, '!' + paths.dest.sprite.scss + '_sprite.scss'], function() {
    runSequence('styles', 'rev', 'template');
  });

  gulp.watch(paths.jshint, function() {
    runSequence('scripts', 'rev', 'template');
  });

  gulp.watch(paths.source.templates, ['template']);
});