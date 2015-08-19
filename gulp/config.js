var ASSETS_DIR = 'assets/';
var PUBLIC_DIR = 'public/';

var config = {
  paths : {
    source : {
      jshint  : ASSETS_DIR + 'js/**/*.js',
      styles  : ASSETS_DIR + 'css/**/*.{sass,scss}',
      scripts : ASSETS_DIR + 'js/main.js',
      images  : ASSETS_DIR + 'images/**/*.{png,jpg,jpeg,gif,svg}',
      copy    : ASSETS_DIR + 'copy/**/*',
      root    : ASSETS_DIR
    },
    dest : PUBLIC_DIR
  }
};

module.exports = config;