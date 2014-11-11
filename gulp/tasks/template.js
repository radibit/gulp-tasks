'use strict';

/*******************************************************************************
 * TEMPLATE TASK
 *
 * this task is responsible for the HTML template for standalone-server
 *  - populate the placeholders for the optimized script & style file names
 *  - and minify the HTML template file to save some bits
 */

var gulp = require('gulp');

gulp.task('template', function() {
  var config     = require('../config'),
    template     = require('gulp-template'),
    minifyHTML   = require('gulp-minify-html'),
    connect      = require('gulp-connect'),
    path         = require('path');

  delete require.cache[path.resolve(config.paths.source.rev + 'all.json')];
  var revs = require('../../' + config.paths.source.rev + 'all.json');

  return gulp.src(config.paths.source.templates)
    .pipe(template({
        asset : function(name) {
          return revs[name];
        }
      }))
    .pipe(minifyHTML({
      comments : false,
      spare : false
    }))
    .pipe(gulp.dest(config.paths.dest.templates))
    .pipe(connect.reload());
});