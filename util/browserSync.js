'use strict';

var
  browserSync = require('browser-sync'),
  browserSyncInstance,
  instanceName = process.env.npm_package_name,

  createInstance = function(name) {
    browserSyncInstance = browserSync.create(name || instanceName);
    instanceName = browserSyncInstance.name;
    return browserSyncInstance;
  },

  getInstance = function(name) {
    if (typeof browserSyncInstance === 'undefined') {
      return createInstance(name);
    }
    return browserSync.get(name || instanceName)
  };

module.exports.createInstance = createInstance;
module.exports.getInstance = getInstance;
