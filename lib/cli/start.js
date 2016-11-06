/**
 * External dependencies
 */
var http = require('http'),
    program = require('commander'),
    fs = require('fs'),
    semver = require('semver'),
    Step = require('step'),
    shelljs = require('shelljs/global'),
    path = require('path');


/**
 * Local modules
 */
var stop = require('./stop'),
    mongod = require('../util/mongod'),
    repl = require('../client/repl'),
    packageInfo = require('../../package'),
    latestversionFile = path.join(__dirname, '../../.latestversion'),
    createServer = require('./createserver');

/**
 * Start the server
 */
var start = function(file) {
  var port = program.port,
      host = program.host || '127.0.0.1',
      dbname = program.dbname || '-deployd',
      mongoPort = generatePort(),
      env = program.environment || process.env.DPD_ENV || 'development',
      retries = 0,
      credentials;

  if (!port) {
    port = 2403;
    retries = env === 'development' && 5;
  }

  if (program.mongoPort) {
      mongoPort = Number(program.mongoPort);
  }

  if (file) {
    process.chdir(path.dirname(file));
  }
  if (test('-f', 'app.dpd')) {
    console.log("deployd CLI version " + packageInfo.version);
    console.log("starting deployd");

    if (fs.existsSync(latestversionFile)) {
      var latest = fs.readFileSync(latestversionFile, 'utf-8');
      if (latest && semver.gt(latest, packageInfo.version)) {
        console.log("deployd CLI v" + latest + " is available.");
        console.log();
      }
    }
    checkForUpdates();

    if (!test('-d', './.dpd')) mkdir('-p', './.dpd');
    if (!test('-d', './.dpd/pids')) mkdir('-p', './.dpd/pids');
    if (!test('-d', './data')) mkdir('-p', './data');

    if (program.auth && program.host === undefined) {
        console.error("Authentication requires the '-h' host flag... exiting.");
        process.exit();
    }

    if (program.host) {
        if (program.auth) {
            Step(function () {
                    var next = this;
                    credentials = {};
                    program.prompt('username: ', function(username){
                        if (username && username !== '') {
                            credentials.username = username;
                            next();
                        } else {
                            console.error('Username cannot be blank.');
                            process.exit();
                        }
                    });
                },
                function () {
                    var next = this;
                    program.password('Password: ', function(pass){
                        if (pass && pass !== '') {
                            credentials.password = pass;
                            next();
                        } else {
                            console.error('Password cannot be blank.');
                            process.exit();
                        }
                    });
                },
                startup
            );
        } else {
            startup();
        }
    } else {
        mongod.restart(program.mongod || 'mongod', env, mongoPort, startup);
    }

  } else {
    console.log("This directory does not contain a Deployd app!");
    console.log("Use \"dpd create <appname>\" to create a new app");
    console.log("or use \"dpd path/to/app.dpd\" to start an app in another directory");
    stop(1);
  }

  function startup (err) {
      if (err) {
        console.log("Failed to start MongoDB (Make sure 'mongod' are in your $PATH or use dpd --mongod option. Ref: http://docs.deployd.com/docs/basics/cli.html)");
        return stop(1);
      }

      var options = {port: port, env: 'development', db: {host: host, port: mongoPort, name: dbname}};

      options.env = program.environment || process.env.DPD_ENV || options.env;
      if(options.env !== 'development') console.log('starting in %s mode', options.env);

      if(credentials !== undefined) options.db.credentials = credentials;
      var dpd = createServer(options);
      dpd.on('listening', onListening);
      dpd.on('error', onError);
      dpd.listen();
      dpd.deploydPath = program.deploydPath;
      
      function onListening () {
        console.info('listening on port', options.port);
        var commands = repl(dpd);
        if (program.dashboard) {
          commands.dashboard();
        } else if (program.open) {
          commands.open();
        }
      }

      function onError (err) {
        if (err.code === "EADDRINUSE") {
          console.error();
          console.error("ERROR: port " + options.port + " is already in use");
          if (retries > 0) {
            options.port++;
            console.log("Trying again on port " + options.port + "...");
            console.log();
            retries--;
            dpd = createServer(options);
            dpd.on('listening', onListening);
            dpd.on('error', onError);
            dpd.listen();
          } else {
            process.exit();
          }
        } else {
          console.error(err);
          process.exit();
        }
      }
    }
}

/**
 * Port generation
 */
function generatePort() {
  var portRange = [ 3000, 9000 ];
  return Math.floor(Math.random() * (portRange[1] - portRange[0])) + portRange[0];
}

function checkForUpdates() {
  http.get('http://registry.npmjs.org/deployd-cli', function(err, res, body) {
    if (!err) {
      var json;
      try {
        json = JSON.parse(body);
      } catch (ex) {
        console.log('Could not parse body', body);
      }

      if (json && json['dist-tags'] && json['dist-tags'].latest) {
        var latest = json['dist-tags'].latest;
        fs.writeFile(latestversionFile, latest);
      }
    }
  });
}

module.exports = start;