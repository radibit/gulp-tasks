var ASSETS_DIR = 'assets/';
var PUBLIC_DIR = 'public/';

var config = {
  paths : {
    jshint    : [ 'gulpfile.js', ASSETS_DIR + 'js/**/*.js', '!' + ASSETS_DIR + 'js/vendor/*.js' ],
    source    : {
      templates      : 'templates/**/*.html',
      styles         : ASSETS_DIR + 'css/**/*.{sass,scss}',
      scripts        : ASSETS_DIR + 'js/*.js', // entry points only
      scripts_vendor : ASSETS_DIR + 'js/vendor/*.js',
      images         : [ASSETS_DIR + 'images/**/*', '!' + ASSETS_DIR + 'images/sprite/**/*'],
      sprite         : ASSETS_DIR + 'images/sprite/**/*.{png,jpg,jpeg}',
      rev            : ASSETS_DIR + 'rev/',
      root           : ASSETS_DIR
    },
    dest    : {
      templates      : PUBLIC_DIR,
      styles         : PUBLIC_DIR + 'css/',
      scripts        : PUBLIC_DIR + 'js/',
      images         : PUBLIC_DIR + 'images/',
      sprite         : {
        img          : PUBLIC_DIR + 'images/',
        scss         : ASSETS_DIR + 'css/variables/'
      },
      root           : PUBLIC_DIR
    }
  },
  browserify: {
    debug: true,
    extensions: [],
    bundleConfigs: []
  }
};

module.exports = config;