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
  const key = this.generate();
  const keys = this;

  this.readFile((err, data) => {
    if (err) return fn(err);

    const fileData = data;

    fileData[key] = true;
    return keys.writeFile(fileData, (errW) => {
      if (errW) return fn(errW);
      return fn(errW, key);
    });
  });
};

/*!
 * Read the contents of the key file as JSON
 */

Keys.prototype.readFile = function (fn) {
  fs.readFile(this.path, 'utf-8', (err, data) => {
    let jsonData;
    let error;

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
  return true;
};

/*
 * Get the first local key
 */


Keys.prototype.getLocal = function (fn) {
  this.readFile((err, data) => {
    if (err) return fn(err);
    if (data && typeof data === 'object') {
      return fn(null, Object.keys(data)[0]);
    }
    return fn();
  });
};
