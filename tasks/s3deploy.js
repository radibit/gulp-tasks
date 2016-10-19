'use strict';

var
  deployData = {
    version: require('../../../package.json').version || 'default'
  },
  gulp = require('gulp'),
  q = require('q'),
  util = require('gulp-util'),
  rename = require('gulp-rename'),
  awspublish = require('gulp-awspublish'),

  s3 = {
    accessKeyId: process.env.AWS_BUCKET_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET,
    region: process.env.AWS_BUCKET_REGION,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME
    }
  };

function uploadStaticFiles(config) {

  return function()  {
    var
      deferred = q.defer(),
      publisher = awspublish.create(s3);

    util.log(util.colors.green("Deployed to S3 bucket '" + s3.params.Bucket + "' to target dir '" + deployData.version + "'."));

    gulp.src(config.source)
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
  };
}

module.exports = function(name, config) {
  gulp.task(name, function (done) {

    var
      repository = require('../util/repository')(deployData);

    repository.getBranchData()
      .then(uploadStaticFiles(config))
      .then(done.bind(null, undefined))
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  });
};