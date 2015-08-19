'use strict';

require('require-dir')('./gulp/tasks', { recurse : true });

var gulp = require('gulp');
gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'scripts', 'images', 'styles')));
gulp.task('default', gulp.series('build'));
gulp.task('watch', gulp.parallel('styles:watch', 'scripts:watch', 'images:watch', 'copy:watch'));
gulp.task('dev', gulp.series('build', 'server', 'watch'));