
function stop(code) {
  var fn = function() {
    exit(code);
  };

  if (program.wait) {
    process.stdin.resume();
    process.stdin.setRawMode(true);
    process.stdout.write('\nPress any key to continue...\n');
    process.stdin.on('keypress', fn);
  } else {
    fn();
  }
}

module.exports = stop;