'use strict';

const fs = require('fs');
const crypto = require('crypto');

/*!
 * A collection of keys backed by a file.
 */

function Keys(path) {
  this.path = path || '.dpd/keys.json';
}
module.exports = Keys;

/*!
 * Get a key from the given keys file.
 */

Keys.prototype.get = function (key, fn) {
  this.readFile((err, data) => {
    fn(err, data[key]);
  });
};

/*!
 * Generate a key using cryptographically strong pseudo-random data.
 */

Keys.prototype.generate = function () {
  return crypto.randomBytes(256).toString('hex');
};

/*!
 * Create a new key and save it in the keys file.
 */

Keys.prototype.create = function (fn) {
  const key = this.generate(),
    keys = this;

  this.readFile((err, data) => {
    if (err) return fn(err);

    data[key] = true;
    keys.writeFile(data, (errW) => {
      fn(errW, key);
    });
  });
};

/*!
 * Read the contents of the key file as JSON
 */

Keys.prototype.readFile = function (fn) {
  fs.readFile(this.path, 'utf-8', (err, data) => {
    let jsonData,
      error;

    try {
      jsonData = (data && JSON.parse(data)) || {};
    } catch (ex) {
      error = ex;
    }

    fn(error, jsonData);
  });
};


/*!
 * Write the contents of the key file as JSON
 */

Keys.prototype.writeFile = function (data, fn) {
  let str;

  try {
    str = JSON.stringify(data);
  } catch (e) {
    return fn(e);
  }

  fs.writeFile(this.path, str, fn);
};

/*
 * Get the first local key
 */


Keys.prototype.getLocal = function (fn) {
  this.readFile((err, data) => {
    if (err) return fn(err);
    if (data && typeof data === 'object') {
      fn(null, Object.keys(data)[0]);
    } else {
      fn();
    }
  });
};
