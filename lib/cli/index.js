/**
 * External dependencies
 */
const program = require('commander');

/**
 * Local modules
 */
const create = require('./create'),
  createserver = require('./createserver'),
  keygen = require('./keygen'),
  showkey = require('./showkey'),
  start = require('./start'),
  stop = require('./stop');

/**
 * Export CLI modules
 */
module.exports = {
  program,
  start,
  create,
  keygen,
  showkey,
  stop,
};
