const start = require('../lib/cli/start');

describe("cli/start.js", function() {
  it("should be defined", function() {
    expect(start).toBeDefined();
    expect(typeof start).toBe('function');
  });
  it("should start a deployd server", function() {
    // start();
  });
});