'use strict';

var
  gulp = require('gulp');

//require('./util/browserSync').createInstance();

require('./tasks/server')('server', {
  baseDir: 'public/'
});

require('./tasks/clean')('clean', {
  dir: 'public/*'
});

require('./tasks/copy')('copy', {
  source: 'demo/copy/**/*',
  dest: 'public/',
  watch: true
});

require('./tasks/image')('images', {
  source: 'demo/images/**/*.{png,jpg,jpeg,gif,svg}',
  dest: 'public/images',
  reloadTaskName: 'server:reload',
  svgoPlugins: [
    {collapseGroups: false},
    {convertPathData: false},
    {convertShapeToPath: false},
    {moveElemsAttrsToGroup: false},
    {moveGroupAttrsToElems: false},
    {removeHiddenElems: false},
    {removeUnknownsAndDefaults: false},
    {removeViewBox: false}
  ],
  reCompress: true,
  watch: true
});

require('./tasks/sass')('sass', {
  base: 'demo/css/',
  source: 'demo/css/**/*.{sass,scss}',
  dest: 'public/css',
  sourcemaps: false,
  minify: true,
  prefixOptions: {browsers: ['> 1%', 'last 1 versions'], cascade: false},
  watch: true
});

require('./tasks/script')('scripts', {
  source: 'demo/js/**/*.js',
  entries: 'demo/js/main.js',
  dest: 'public/js',
  jshint: {
    reporter: 'jshint-stylish',
    options: {
      esnext: true
    }
  },
  sourcemaps: true,
  minify: true,
  watch: true
});

require('./tasks/styleguide')('styleguide', {
  patterns: {
    sourcePath: 'demo/templates',
    sourceExt: 'twig',
    targetExt: 'html',
    dataExt: 'json'
  },
  viewerApp: {
    dest: 'public/styleguide',
    cssFiles: ['../css/main.css']
  },
  server: {
    https: true
  }
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'scripts', 'images', 'sass')));
gulp.task('default', gulp.series('build'));
gulp.task('watch', gulp.parallel('sass:watch', 'scripts:watch', 'images:watch', 'copy:watch'));
gulp.task('dev', gulp.series('build', 'server', 'watch'));

gulp.task('dev:styleguide', gulp.series('build', 'styleguide:dev', 'watch'));
gulp.task('build:styleguide', gulp.series('build', 'styleguide:build'));