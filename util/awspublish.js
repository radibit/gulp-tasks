'use strict';

var
  deployData,
  s3,
  source,
  gulp = require('gulp'),
  q = require('q'),
  util = require('gulp-util'),
  rename = require('gulp-rename'),
  awspublish = require('gulp-awspublish');

function uploadStaticFiles() {

  var
    deferred = q.defer(),
    publisher = awspublish.create(s3);

  util.log(util.colors.green("Deployed to S3 bucket '" + s3.params.Bucket + "' to target dir '" + deployData.version + "'."));

  gulp.src(source)
    .pipe(rename(function (path) {
      path.dirname = deployData.version+'/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe(publisher.sync(deployData.version))
    .pipe(awspublish.reporter())
    .on('end', function (error) {
      if (error) {
        return deferred.reject(error);
      }
      deferred.resolve();
    });

  return deferred.promise;
}

function awspublishConstructor(_source, _s3, _deployData) {
  deployData = _deployData;
  s3 = _s3,
  source = _source;

  return {
    uploadStaticFiles: uploadStaticFiles
  }
}

module.exports = awspublishConstructor;