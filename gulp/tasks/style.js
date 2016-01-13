'use strict';

var gulp = require('gulp'),
  config = require('../config'),
  paths  = config.paths;

gulp.task('styles', function() {
  var sass     = require('gulp-sass'),
    cssnano    = require('gulp-cssnano'),
    prefix     = require('gulp-autoprefixer'),
    path       = require('path'),
    sourcemaps = require('gulp-sourcemaps');

  return gulp.src(paths.source.styles, {base : path.join(process.cwd(), paths.source.root)})
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['./' + paths.source.root  + ' css']}))
    .pipe(cssnano())
    .pipe(prefix('last 1 version', '> 1%'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest));
});
