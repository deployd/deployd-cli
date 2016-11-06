var keygen = function() {
    var Keys = require('../keys')
      , keys = new Keys();

    keys.create(function(err, key) {
      if(err) return console.error(err);
      console.log('created key', key.substr(0, 16) + '...');
    });
  }


module.exports = keygen;