'use strict';

/**
 * External dependencies
 */
const http = require('http');
const program = require('commander');
const fs = require('fs');
const semver = require('semver');
const Step = require('step');
const shelljs = require('shelljs/global');
const path = require('path');


/**
 * Local modules
 */
const stop = require('./stop');
const mongod = require('../util/mongod');
const repl = require('../client/repl');
const packageInfo = require('../../package');

const latestversionFile = path.join(__dirname, '../../.latestversion');
const createServer = require('./createserver');


/**
 * Start the server
 */
const start = function (file) {
  let port = program.port,
    host = program.host || '127.0.0.1',
    dbname = program.dbname || '-deployd',
    mongoPort = generatePort(),
    env = program.environment || process.env.DPD_ENV || 'development',
    retries = 0,
    credentials = {};


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
    console.log(`deployd CLI version ${packageInfo.version}`);
    console.log('starting deployd');

    if (fs.existsSync(latestversionFile)) {
      const latest = fs.readFileSync(latestversionFile, 'utf-8');
      if (latest && semver.gt(latest, packageInfo.version)) {
        console.log(`deployd CLI v${latest} is available.`);
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

    function setCredentials(username, password) { // eslint-disable-line no-inner-declarations
      Step(function () {
        const next = this;
        if (username && username !== '') {
          credentials.username = username;
          next();
        } else {
          console.error('Username cannot be blank.');
          process.exit();
        }
      },
        function () {
          const next = this;
          if (password && password !== '') {
            credentials.password = password;
            next();
          } else {
            console.error('Password cannot be blank.');
            process.exit();
          }
        },
        startup
      );
    }

    if (program.host) {
      if (program.auth) {
        const auth = program.auth.split(':'),
          username = auth[0],
          password = auth[1];
        setCredentials(username, password);
      } else if (program.username || program.password) {
        setCredentials(program.username, program.password);
      } else {
        startup();
      }
    } else {
      mongod.restart(program.mongod || 'mongod', env, mongoPort, startup);
    }
  } else {
    console.log('This directory does not contain a Deployd app!');
    console.log('Use "dpd create <appname>" to create a new app');
    console.log('or use "dpd path/to/app.dpd" to start an app in another directory');
    stop(1);
  }

  function startup(err) {
    if (err) {
      console.log("Failed to start MongoDB (Make sure 'mongod' are in your $PATH or use dpd --mongod option. Ref: http://docs.deployd.com/docs/basics/cli.html)");
      return stop(1);
    }

    const options = { port, env: 'development', db: { host, port: mongoPort, name: dbname } };

    options.env = program.environment || process.env.DPD_ENV || options.env;
    if (options.env !== 'development') console.log('starting in %s mode', options.env);

    if (credentials !== undefined) options.db.credentials = credentials;

    let dpd = createServer(options);
    dpd.on('listening', onListening);
    dpd.on('error', onError);
    dpd.listen();
    dpd.deploydPath = program.deploydPath;

    function onListening() {
      console.info('listening on port', options.port);
      const commands = repl(dpd);
      if (program.dashboard) {
        commands.dashboard();
      } else if (program.open) {
        commands.open();
      }
    }

    function onError(err2) {
      if (err2.code === 'EADDRINUSE') {
        console.error();
        console.error(`ERROR: port ${options.port} is already in use`);
        if (retries > 0) {
          options.port += 1;
          console.log(`Trying again on port ${options.port}...`);
          console.log();
          retries -= 1;
          dpd = createServer(options);
          dpd.on('listening', onListening);
          dpd.on('error', onError);
          dpd.listen();
        } else {
          process.exit();
        }
      } else {
        console.error(err2);
        process.exit();
      }
    }
  }
};

/**
 * Port generation
 */
function generatePort() {
  const portRange = [3000, 9000];
  return Math.floor(Math.random() * (portRange[1] - portRange[0])) + portRange[0];
}

function checkForUpdates() {
  http.get('http://registry.npmjs.org/deployd-cli', (err, res, body) => {
    if (!err) {
      let json;
      try {
        json = JSON.parse(body);
      } catch (ex) {
        console.log('Could not parse body', body);
      }

      if (json && json['dist-tags'] && json['dist-tags'].latest) {
        const latest = json['dist-tags'].latest;
        fs.writeFile(latestversionFile, latest);
      }
    }
  });
}

module.exports = start;
