'use strict';

/*******************************************************************************
 * IMAGE TASK
 *
 * this task is responsible for image optimization
 *  - optimize all images in the assets folder and move them to
 *    the public folder
 */

var gulp = require('gulp');

gulp.task('sprite', function() {
  var imagemin  = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    paths       = require('../config').paths,
    spriteData  = gulp.src(paths.source.sprite)
    .pipe(spritesmith({
      imgName   : 'sprite.png',
      cssName   : '_sprite.scss',
      algorithm : 'binary-tree',
      imgPath   : '../../images/sprite.png',
      cssVarMap : function (sprite) {
        var parts = sprite.source_image.split('/');
        var group = parts[parts.length - 2] === 'sprite' ? '' : parts[parts.length - 2] + '-';
        sprite.name = 'sprite-' + group + sprite.name;
      }
    }));

  spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest.sprite.img));

  spriteData.css
    .pipe(gulp.dest(paths.dest.sprite.scss));

  return spriteData;
});
