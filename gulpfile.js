'use strict';

var
  gulp = require('gulp');

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
    {convertShapeToPath: true},
    {moveElemsAttrsToGroup: false},
    {moveGroupAttrsToElems: false},
    {removeHiddenElems: false},
    {removeUnknownsAndDefaults: false},
    {removeViewBox: false}
  ],
  reCompress: true,
  watch: true,
  hook: function(file, t) { console.log(file.path.toString()); }
  }
);

require('./tasks/sass')('sass', {
  base: 'demo/css/',
  source: 'demo/css/**/*.{sass,scss}',
  dest: 'public/css',
  sourcemaps: false,
  minify: true,
  prefixOptions: {browsers: ['> 1%', 'last 1 versions'], cascade: false},
  watch: true
});

require('./tasks/stylus')('stylus', {
  base: 'demo/stylus/',
  source: ['demo/stylus/**/*.styl','!demo/stylus/**/_*.styl'],
  dest: 'public/css',
  targetFile: 'master.css',
  sourcemaps: false,
  minify: true,
  stylusOptions: {
    define: {
      importTree: require('stylus-import-tree')
    },
    "include css": true,
    use: [require('nib')()],
    import: [
      __dirname + '/demo/stylus/_mixins',
      __dirname + '/demo/stylus/_variables'
    ]
  },
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
    dataExt: 'json',
    mockFunctionsFile: 'mockFunctionsFile.js'

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