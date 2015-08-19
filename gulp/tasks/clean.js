'use strict';

require('gulp').task('clean', function(cb) {
  return require('del')(require('../config').paths.dest, cb);
});