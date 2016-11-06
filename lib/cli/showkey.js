/**
 * Show current key
 */
var showkey = function() {
  var Keys = require('../keys'),
      keys = new Keys();

  keys.getLocal(function(err, key) {
    if(err) return console.error(err);
    if(!key) {
      console.log('No key file found. Run the following to create one:');
      console.log();
      console.log('dpd keygen');
      console.log();
      return;
    }
    console.log("Copy this key for use in remote dashboard");
    console.log();
    console.log(key);
    console.log();
  });
}

module.exports = showkey;