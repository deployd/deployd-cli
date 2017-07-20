
const path = require('path');
const execa = require('execa');
const del = require('del');


describe('test CLI', () => {
  beforeEach((done) => {
    del(['testAppDoNotKeep']).then(done).catch(done);
  });

  it('should create a project', (done) => {
    execa(path.join(__dirname, '../bin/dpd.js'), ['create', 'testAppDoNotKeep']).then((result) => {
      console.log(result.stdout);
      expect(result.stdout).toContain('dpd is installing the dependencies... please be patient (this may take a few minutes)');
      done();
    }).catch((err) => {
      console.log('error', err);
      done.fail(err);
    });
  });


  afterEach((done) => {
    del(['testAppDoNotKeep']).then(done);
  });
});
