'use strict';

var gulp = require('gulp'),
  paths = require('../config').paths;

gulp.task('scripts', function() {
  var jshint = require('gulp-jshint');

  gulp.src(paths.source.jshint)
    .pipe(jshint({ esnext : true }))
    .pipe(jshint.reporter('jshint-stylish'));
    // .pipe(jshint.reporter('fail'));


  var
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    path       = require('path'),
    gutil      = require('gutil');

  return browserify({ entries : paths.source.scripts })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + 'js'));
});
