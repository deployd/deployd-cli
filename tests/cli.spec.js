const cli = require('../lib/cli');

describe("cli/index.js", function() {
  it("should be defined", function() {
    expect(cli).toBeDefined();
  });
  it("should contain a create function", function() {
    expect(cli.create).toBeDefined();
    expect(typeof cli.create).toBe('function');
  });
  it("should contain a start function", function() {
    expect(cli.start).toBeDefined();
    expect(typeof cli.start).toBe('function');
  });
  it("should contain a stop function", function() {
    expect(cli.stop).toBeDefined();
    expect(typeof cli.stop).toBe('function');
  });
  it("should contain a createServer function", function() {
    expect(cli.createServer).toBeDefined();
    expect(typeof cli.createServer).toBe('function');
  });
  it("should contain a keygen function", function() {
    expect(cli.keygen).toBeDefined();
    expect(typeof cli.keygen).toBe('function');
  });
  it("should contain a showkey function", function() {
    expect(cli.showkey).toBeDefined();
    expect(typeof cli.showkey).toBe('function');
  });
});