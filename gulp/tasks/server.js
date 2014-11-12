'use strict';

/*******************************************************************************
 * SERVER TASK
 *
 * this task will start browser-sync with connect server
 */

require('gulp').task('server', function() {
  var browserSync = require('browser-sync'),
    paths         = require('../config').paths;

  browserSync({
    server : {
      baseDir : paths.dest.root
    },
    open : false
  });
});