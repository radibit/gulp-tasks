'use strict';

var
  gulp = require('gulp'),
  dotenv = require('dotenv'),
  argv = require('yargs').argv;

dotenv.config({silent: true});

require('./tasks/server')('server', {
  baseDir: 'public/'
});

require('./tasks/clean')('clean', {
  dir: 'public/*'
});

require('./tasks/copy')('copy', {
  source: 'demo/copy/**/*',
  dest: 'public/',
  watch: process.argv[2] === 'dev'
});

require('./tasks/fonts')('fonts', {
  source: 'demo/fonts/**/*.{otf,ttf,woff,woff2,svg}',
  dest: 'public/css',
  targetFile: 'fonts.css',
  watch: process.argv[2] === 'dev'
});

require('./tasks/image')('images', {
  source: ['demo/images/**/*.{png,jpg,jpeg,gif,svg}','demo/templates/**/*.{png,jpg,jpeg,gif,svg}'],
  dest: 'public/images',
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
  flatten: true,
  hook: function(file, t) { console.log(file.path.toString()); },
  watch: process.argv[2] === 'dev'
  }
);

require('./tasks/sass')('sass', {
  base: 'demo/css/',
  source: 'demo/css/**/*.{sass,scss}',
  dest: 'public/css',
  sourcemaps: argv.minify || false,
  minify: argv.minify || false,
  prefixOptions: {browsers: ['> 1%', 'last 1 versions'], cascade: false},
  watch: process.argv[2] === 'dev'
});

require('./tasks/stylus')('stylus', {
  base: 'demo/stylus/',
  source: ['demo/stylus/**/*.styl','!demo/stylus/**/_*.styl'],
  dest: 'public/css',
  targetFile: 'master.css',
  sourcemaps: argv.minify || false,
  minify: argv.minify || false,
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
  watch: process.argv[2] === 'dev'
});

require('./tasks/script')('scripts', {
  source: 'demo/js/**/*.js',
  entries: 'demo/js/*.js',
  dest: 'public/js',
  jshint: {
    reporter: 'jshint-stylish',
    options: {
      esnext: true
    }
  },
  sourcemaps: argv.minify || false,
  minify: argv.minify || false,
  watch: process.argv[2] === 'dev'
});

require('./tasks/styleguide')('styleguide', {
  patterns: {
    sourcePath: 'demo/templates',
    sourceExt: 'twig',
    targetExt: 'html',
    dataExt: 'json',
    mockFunctionsFile: 'mockFunctionsFile.js',
    engine: 'nunjucks'
  },
  viewerApp: {
    dest: 'public/styleguide',
    cssFiles: ['../css/main.css']
  },
  server: {
    https: true
  }
});


require('./tasks/gzip')('gzip', {
  source: ['public/**/*.js', 'public/**/*.css'],
  dest: 'public'
});


require('./tasks/s3deploy')('s3deploy', {
  source: 'public/**/*'
});


gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'stylus')));
gulp.task('default', gulp.series('build'));
gulp.task('watch', gulp.parallel('stylus:watch', 'scripts:watch'));
gulp.task('dev', gulp.series('build', 'server', 'watch'));

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'scripts', 'images', 'sass')));
gulp.task('default', gulp.series('build'));
gulp.task('watch', gulp.parallel('sass:watch', 'scripts:watch', 'images:watch', 'copy:watch'));
gulp.task('dev', gulp.series('build', 'server', 'watch'));


gulp.task('deploy', gulp.series('build', 'gzip', 's3deploy'));

gulp.task('dev:styleguide', gulp.series('build', 'styleguide:dev', 'watch'));
gulp.task('build:styleguide', gulp.series('build', 'styleguide:build'));

