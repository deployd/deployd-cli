/**
 * External dependencies
 */
var program = require('commander');

/**
 * Local modules
 */
var create = require('./create'),
    createserver = require('./createserver'),
    keygen = require('./keygen'),
    showkey = require('./showkey'),
    start = require('./start'),
    stop = require('./stop');

/**
 * Export CLI modules
 */
module.exports = {
  program: program,
  start: start,
  create: create,
  keygen: keygen,
  showkey: showkey,
  start: start,
  stop: stop
};