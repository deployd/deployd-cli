const fs = require('fs');
const spawn = require('child_process').spawn;
const debug = require('debug')('mongod');

/*!
 * Utility for restarting the current apps mongod instance.
 */

exports.restart = function (mongod, env, port, fn) {
  let pid;

  debug('starting %s', mongod);

  try {
    fs.unlinkSync('./data/mongod.lock');
    pid = JSON.parse(fs.readFileSync('./.dpd/pids/mongod'));

    if (pid) {
      debug('pid %s', pid);
      process.kill(pid);
    } else {
      debug('no pid found');
    }
  } catch (e) {
    debug('no pid found');
  }

  /*!
  * The mongodb config file is set to the platform-specific
  * null device in order to override the default options of mongodb in
  * Homebrew and similar distributions.
  */
  const options = [
    '--dbpath',
    './data',
    '--pidfilepath',
    './.dpd/pids/mongod',
    '--port',
    port,
    '-f',
    fs.existsSync('/dev/null') ? '/dev/null' : 'NUL'
  ];
  if (env === 'development') {
    options.push('--nojournal');
    options.push('--smallfiles');
    options.push('--nssize');
    options.push('4');
  }

  const proc = spawn(mongod, options, { title: 'FOOBAR', stdio: 'pipe' });
  let buf = '';
  proc.stdout.on('data', (data) => {
    buf += data;
    if (~buf.indexOf('waiting for connections on port')) { // eslint-disable-line no-bitwise
      proc.emit('listening');
    }
    debug(data.toString());
  });

  function kill(e) {
    if (e) debug('error: %s', e);
    debug('killing mongod');
    fs.writeFileSync('./.dpd/pids/mongod', '');
    proc.kill();
    process.exit(0);
  }

  // callback
  proc.once('listening', fn);
  proc.on('error', (err) => {
    debug('proc error %s %s', mongod, err);
    // report error to startup function in bin/dpd
    fn(err);
  });
  proc.on('exit', (code) => {
    debug('exit code %s', code);
    if (code) fn(code);
  });

  process.stdin.on('end', (err) => {
    debug('process end %s', err);
    kill(err);
  });

  process.on('exit', (err) => {
    debug('process exit %s', err);
    kill(err);
  });
  // on non win32 platforms SIGTERM is emitted instead of exit when
  // a process is killed by another process, so use it to end our mongo
  // process
  process.on('SIGTERM', (err) => {
    debug('process SIGTERM %s', err);
    kill(err);
  });
};
