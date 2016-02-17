'use strict';

var
  through = require('through2'),
  tap = require('gulp-tap'),

  isMinify = function (config) {
    if (isWatch(config) === true) return false;
    return config.minify === true;
  },

  ifMinify = function (config, cb) {
    return (isMinify(config) && cb) ? cb : through.obj();
  },

  isSourceMap = function (config) {
    if (isMinify(config) === false) return false;
    return config.sourcemaps === true;
  },

  ifSourceMap = function (config, cb) {
    return (isSourceMap(config) && cb) ? cb : through.obj();
  },

  isConcat = function (config) {
    return 'string' === typeof config.targetFile;
  },

  ifConcat = function (config, cb) {
    return (isConcat(config) && cb) ? cb : through.obj();
  },

  isWatch = function (config) {
    return config.watch === true;
  },

  ifWatch = function (config, cb) {
    return (isWatch(config) && cb) ? cb : through.obj();
  },

  isHook = function (config) {
    return 'function' === typeof config.hook;
  },

  ifHook = function (config, cb) {
    return (isHook(config) && cb) ? tap(cb) : through.obj();
  },

  isDest = function (config) {
    return 'string' === typeof config.dest;
  },

  ifDest = function (config, cb) {
    return (isDest(config) && cb) ? cb : through.obj();
  };


module.exports.ifMinify = ifMinify;
module.exports.ifSourceMap = ifSourceMap;
module.exports.ifConcat = ifConcat;
module.exports.ifWatch = ifWatch;
module.exports.ifHook = ifHook;
module.exports.ifDest = ifDest;
