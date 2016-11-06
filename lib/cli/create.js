/**
 * External dependencies
 */
var path = require('path'),
    shelljs = require('shelljs/global'), // Used for mkdir, rm, cp
    program = require('commander'),
    exec = require('child_process').exec;

/**
 * Local dependencies
 */
var start = require('./start');

/**
 * Create a new app with folder structure and files
 */
var create = function(name) {
    name = name || 'my-deployd-app';
    if (test('-d',  name)) {
      return console.info(name + " already exists in this directory");
    }

    mkdir('-p', name);
    cp('-Rf', path.join(__dirname, '../createtemplate/*'), name);
    mkdir('-p', name + '/.dpd');
    mkdir('-p', name + '/.dpd/pids');
    ('').to(name + '/.dpd/pids/mongod');
    rm(ls('-R', name).filter(function(p) {
      return path.basename(p) === 'PLACEHOLDER';
    }).map(function(p) { return name + '/' + p}));
    
    process.chdir(name);
    
    console.log('dpd is installing the dependencies... please be patient')
    child = exec('npm install',
      function (error, stdout, stderr) {
        if (error !== null) {
            console.log(stderr);
            console.log('npm install error: ' + error);
        } else {
          if (program.dashboard || program.open) {
            start(name + '/app.dpd');
          } else {
            console.info('to start your app:');
            console.info('\t$ cd', name);
            console.info('\t$ dpd');
          }
        }
      });

  }

  module.exports = create;