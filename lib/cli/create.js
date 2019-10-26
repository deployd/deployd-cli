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
  const newName = name || 'my-deployd-app';
  if (test('-d', newName)) {
    return console.info(`${newName} already exists in this directory`);
  }

  mkdir('-p', newName);
  cp('-Rf', path.join(__dirname, '../createtemplate/*'), newName);
  mkdir('-p', `${newName}/.dpd`);
  mkdir('-p', `${newName}/.dpd/pids`);
  ('').to(`${newName}/.dpd/pids/mongod`);
  ('# npm\r\nnode_modules/\r\nnpm-debug.log\r\n\r\n# deployd\r\n.dpd/\r\ndata/')
    .to(`${newName}/.gitignore`);
  rm(ls('-R', newName).filter(p => path.basename(p) === 'PLACEHOLDER').map(p => `${newName}/${p}`));

  process.chdir(newName);

  console.log('dpd is installing the dependencies... please be patient (this may take a few minutes)');
  exec('npm install',
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(stderr);
          console.log(`npm install error: ${error}`);
        } else if (program.dashboard || program.open) {
          start(`${newName}/app.dpd`);
        } else {
          console.info('to start your app:');
          console.info('\t$ cd', newName);
          console.info('\t$ dpd');
        }
      });
};

module.exports = create;
