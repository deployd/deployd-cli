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
  const newProjectName = name || 'my-deployd-app';
  if (test('-d', newProjectName)) {
    return console.info(`${newProjectName} already exists in this directory`);
  }

  mkdir('-p', newProjectName);
  cp('-Rf', path.join(__dirname, '../createtemplate/*'), newProjectName);
  mkdir('-p', `${newProjectName}/.dpd`);
  mkdir('-p', `${newProjectName}/.dpd/pids`);
  ('').to(`${newProjectName}/.dpd/pids/mongod`);
  ('# npm\r\nnode_modules/\r\nnpm-debug.log\r\n\r\n# deployd\r\n.dpd/\r\ndata/')
    .to(`${newProjectName}/.gitignore`);
  rm(ls('-R', newProjectName).filter(p => path.basename(p) === 'PLACEHOLDER').map(p => `${newProjectName}/${p}`));

  process.chdir(newProjectName);

  console.log('dpd is installing the dependencies... please be patient (this may take a few minutes)');
  const child = exec('npm install',
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(stderr);
          console.log(`npm install error: ${error}`);
        } else if (program.dashboard || program.open) {
          start(`${newProjectName}/app.dpd`);
        } else {
          console.info('to start your app:');
          console.info('\t$ cd', newProjectName);
          console.info('\t$ dpd');
        }
      });
};

module.exports = create;
