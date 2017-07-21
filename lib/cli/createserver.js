'use strict';

/**
 * External dependencies
 */
const upgrade = require('doh').upgrade;
const program = require('commander');
const resolve = require('resolve').sync;

/**
 * Start server
 */
const createServer = function (config) {
  let deploydpath;
  try {
    deploydpath = program.deploydPath || resolve('deployd', { basedir: process.cwd() });
  } catch (e) {
    console.log('Unable to find local deployd');
    process.exit(99);
  }

  const Server = require(deploydpath); // eslint-disable-line global-require

  const server = new Server(config);
  server.options = config;
  upgrade(server);

  return server;
};

module.exports = createServer;
