'use strict';

var
  through = require('through2'),
  tap = require('gulp-tap'),

  isMinify = function (config) {
    return true === config.minify || 'true' === config.minify;
  },

  ifMinify = function (config, cb) {
    return (isMinify(config) && cb) ? cb : through.obj();
  },

  isSourceMap = function (config) {
    if (false === isMinify(config)) return false;
    return true === config.sourcemaps || 'true' === config.sourcemaps;
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
    return true === config.watch;
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
  },

  isFlatten = function (config) {
    return true === config.flatten;
  },

  isSync = function (config) {
    return true === config.sync;
  },

  ifFlatten = function (config, cb) {
    return (isFlatten(config) && cb) ? cb : through.obj();
  };


module.exports.ifMinify = ifMinify;
module.exports.ifSourceMap = ifSourceMap;
module.exports.ifConcat = ifConcat;
module.exports.ifWatch = ifWatch;
module.exports.ifHook = ifHook;
module.exports.ifDest = ifDest;
module.exports.isSync = isSync;
module.exports.ifFlatten = ifFlatten;
