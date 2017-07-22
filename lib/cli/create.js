'use strict';

/**
 * External dependencies
 */
const path = require('path');
const shelljs = require('shelljs/global'); // eslint-disable-line no-unused-vars
const program = require('commander');
const exec = require('child_process').exec;

/**
 * Local dependencies
 */
const start = require('./start');

/**
 * Create a new app with folder structure and files
 */
const create = function (name) {
  name = name || 'my-deployd-app';
  if (test('-d', name)) {
    return console.info(`${name} already exists in this directory`);
  }

  mkdir('-p', name);
  cp('-Rf', path.join(__dirname, '../createtemplate/*'), name);
  mkdir('-p', `${name}/.dpd`);
  mkdir('-p', `${name}/.dpd/pids`);
  ('').to(`${name}/.dpd/pids/mongod`);
  rm(ls('-R', name).filter(p => path.basename(p) === 'PLACEHOLDER').map(p => `${name}/${p}`));

  process.chdir(name);

  console.log('dpd is installing the dependencies... please be patient (this may take a few minutes)');
  const child = exec('npm install',
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(stderr);
          console.log(`npm install error: ${error}`);
        } else if (program.dashboard || program.open) {
          start(`${name}/app.dpd`);
        } else {
          console.info('to start your app:');
          console.info('\t$ cd', name);
          console.info('\t$ dpd');
        }
      });
};

module.exports = create;
