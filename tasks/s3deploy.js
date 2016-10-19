'use strict';

var
  deployData = {},
  gulp = require('gulp'),

  s3 = {
    accessKeyId: process.env.AWS_BUCKET_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET,
    region: process.env.AWS_BUCKET_REGION,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME
    }
  };

module.exports = function(name, config) {
  gulp.task(name, function (done) {

    var
      repository = require('../util/repository')(deployData),
      awspublish = require('../util/awspublish')(config.source, config.s3 || s3, deployData);

    repository.getBranchData()
      .then(awspublish.uploadStaticFiles)
      .then(done.bind(null, undefined))
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  });
};