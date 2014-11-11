'use strict';

/*******************************************************************************
 * STYLE TASK
 *
 * this task is responsible for the style files
 * - delete old generated css files
 * - compile the less files to css
 * - minify the css files
 * - hash the files
 * - and save the new file name in the 'stylesHash' variable
 */

var gulp = require('gulp'),
  config = require('../config'),
  paths  = config.paths;

gulp.task('styles', function() {
  var sass     = require('gulp-sass'),
    minifyCSS  = require('gulp-minify-css'),
    prefix     = require('gulp-autoprefixer'),
    rev        = require('gulp-rev'),
    path       = require('path'),
    sourcemaps = require('gulp-sourcemaps');

  require('del')(paths.dest.styles);

  return gulp.src(paths.source.styles, {base : path.join(process.cwd(), paths.source.root)})
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['./' + paths.source.root  + ' css']}))
    .pipe(minifyCSS())
    .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(rev())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.root))
    .pipe(rev.manifest({path: 'css.json'}))
    .pipe(gulp.dest(paths.source.rev));
});
