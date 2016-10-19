'use strict';

var
  q = require('q'),
  Repo = require('git-tools'),

  deployData = {};


function requestBranch() {

  var
    repo = new Repo(),
    deferred = q.defer();

  function onRequestCurrentBranchCallback(error, branch) {

    if (error) {
      rejectPromise(error);
      return;
    }

    if (branch === null) {
      repo.branches(onRequestBranchesCallback)
    }
    else {
      resolvePromise(branch);
    }
  }

  function onRequestBranchesCallback(error, branches) {

    if (error) {
      rejectPromise(error);
      return;
    }
    resolvePromise(branches[branches.length - 1].name);
  }

  function rejectPromise(error) {
    deferred.reject(error);
  }

  function resolvePromise(branch) {
    deployData.isMaster = (branch === 'master');
    deployData.branch = branch;
    deployData.version = process.env.npm_package_version
    if (!deployData.isMaster) {
      deployData.version = deployData.version + '-' + deployData.branch
    }
    deferred.resolve();
  }

  repo.currentBranch(onRequestCurrentBranchCallback);
  return deferred.promise;
}

function requestCommitHash() {

  var
    repo = new Repo(),
    deferred = q.defer();

  function onRequestCommitCallback(error, data) {

    if (error) {
      deferred.reject(error);
      return;
    }
    deployData.commit = data.toString().substring(0, 8);
    deferred.resolve();
  }

  repo.exec("rev-parse", "HEAD", onRequestCommitCallback);

  return deferred.promise;
}

function getBranchData() {
  return q.all([requestBranch(), requestCommitHash()])
}

function repositoryConstructor(_deployData) {
  deployData = _deployData;
  return {
    getBranchData: getBranchData
  }
}

module.exports = repositoryConstructor;