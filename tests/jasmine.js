/**
 * External dependencies
 */
const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter');

var jrunner = new Jasmine();
jrunner.env.clearReporters();
jrunner.addReporter(new SpecReporter({
  displaySpecDuration: true,
  displayStacktrace: 'all',
}));
jrunner.specDir = 'tests';
jrunner.randomizeTests(false);
jrunner.addSpecFiles(['**/*[sS]pec.js']);
jrunner.execute();