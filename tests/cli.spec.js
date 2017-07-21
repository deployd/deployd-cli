'use strict';

const path = require('path');
const execa = require('execa');
const del = require('del');


describe('test CLI', () => {
  beforeEach((done) => {
    del(['testAppDoNotKeep'])
      .then(done)
      .catch(done);
  });

  it('should create a project', (done) => {
    execa(path.join(__dirname, '../bin/dpd.js'), ['create', 'testAppDoNotKeep'])
      .then((result) => {
        expect(result.stdout)
          .toContain('dpd is installing the dependencies... please be patient (this may take a few minutes)');
        done();
      }).catch(done.fail);
  }, 20000); // Huge timeout to let npm install all deps, obviously, needs to be changed


  it('should create a project', (done) => {
    execa(path.join(__dirname, '../bin/dpd.js'), ['cmdDontExist'])
      .then((result) => {
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
