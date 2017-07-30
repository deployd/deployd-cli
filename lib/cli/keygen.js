'use strict';

const Keys = require('../keys');

/**
 * Generate a key
 */
const keygen = function () {
  const keys = new Keys();

  keys.create((err, key) => {
    if (err) return console.error(err);
    console.log('created key', `${key.substr(0, 16)}...`);
  });
};


module.exports = keygen;
