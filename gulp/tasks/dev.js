'use strict';

/*******************************************************************************
 * DEV TASK
 *
 * run all build related tasks, kick of server at 8080
 * and enable file watcher with:
 *
 * $ gulp dev
 *
 */

require('gulp').task('dev', ['build', 'connect', 'watch']);