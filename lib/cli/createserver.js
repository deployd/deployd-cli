/**
 * External dependencies
 */
var upgrade = require('doh').upgrade,
    program = require('commander'),
    resolve = require('resolve').sync;


/**
 * Start server
 */
function createServer(config) {
  var deploydpath;
  try {
    deploydpath = program.deploydPath || resolve('deployd', {basedir: process.cwd()});
  } catch (e) {
    console.log('Unable to find local deployd');
    process.exit(99);
  }
 
  var Server = require(deploydpath);

  var server = new Server(config);
  server.options = config;
  upgrade(server);

  return server;  
}

module.exports = createServer;