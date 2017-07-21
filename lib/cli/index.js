'use strict';

/**
 * External dependencies
 */
const program = require('commander');

/**
 * Local modules
 */
const create = require('./create');
const createserver = require('./createserver');
const keygen = require('./keygen');
const showkey = require('./showkey');
const start = require('./start');
const stop = require('./stop');

/**
 * Export CLI modules
 */
module.exports = {
  program,
  start,
  create,
  keygen,
  showkey,
  stop
};
