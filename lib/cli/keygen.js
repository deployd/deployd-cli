'use strict';

/**
 * Generate a key
 */
const Keys = require('../keys');

const keygen = function () {
  const keys = new Keys();

  keys.create((err, key) => {
    if (err) return console.error(err);
    console.log('created key', `${key.substr(0, 16)}...`);
    return true;
  });
};


module.exports = keygen;
