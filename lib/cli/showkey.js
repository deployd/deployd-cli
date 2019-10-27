'use strict';

/**
 * Show current key
 */

const Keys = require('../keys');

const showkey = function () {
  const keys = new Keys();

  keys.getLocal((err, key) => {
    if (err) return console.error(err);
    if (!key) {
      console.log('No key file found. Run the following to create one:');
      console.log();
      console.log('dpd keygen');
      console.log();
      return true;
    }
    console.log('Copy this key for use in remote dashboard');
    console.log();
    console.log(key);
    console.log();
    return true;
  });
};

module.exports = showkey;
