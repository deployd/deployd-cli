'use strict';

const path = require('path');
const execa = require('execa');
const del = require('del');

/**
 * Integration tests for the Deployd CLI
 * These tests will execute the commands provided by the deployd-cli
 * and make sure the output is what should be expected
 *
 * Since these commands can take a while to be done, timeouts are high.
 * TODO:
 * - test 'start' command with a valid deployd app with all configuration options
 * - test 'keygen' command
 * - test 'showkey' command
 */
describe('Integration tests for the Deployd Command Line Interface', () => {
  beforeEach((done) => {
    del(['testAppDoNotKeep'])
      .then(done)
      .catch(done);
  });

  it('should create a project properly', (done) => {
    execa(path.join(__dirname, '../bin/dpd.js'), ['create', 'testAppDoNotKeep'])
      .then((result) => {
        expect(result.stdout)
          .toContain('dpd is installing the dependencies... please be patient (this may take a few minutes)');
        done();
      }).catch(done.fail);
  }, 20000); // Huge timeout to let npm install all deps, obviously, needs to be changed


  it('should throw an error when running start in a directory which is not a deployd app', (done) => {
    execa(path.join(__dirname, '../bin/dpd.js'), ['cmdDontExist'])
      .then(() => {
        done.fail();
      }).catch((err) => {
        expect(err.stdout).toContain('This directory does not contain a Deployd app!');
        done();
      });
  });

  afterEach((done) => {
    del(['testAppDoNotKeep'])
      .then(done)
      .catch(done);
  });
});
