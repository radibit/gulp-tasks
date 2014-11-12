'use strict';

/*******************************************************************************
 * DEV TASK
 *
 * run all build related tasks, kick of server (default: port 3000)
 * and enable file watcher with:
 *
 * $ gulp dev
 *
 */

require('gulp').task('dev', ['server', 'build', 'watch']);