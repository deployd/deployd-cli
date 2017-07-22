'use strict';

/* eslint-disable */
const resolve = require('resolve').sync,
  _open = require('opener'),
  repl = require('repl');

let server;

module.exports = function (dpd) {
  console.log('type help for a list of commands');
  const context = repl.start('dpd > ', null, replEval, true, true).context;
  server = dpd;

  context.dpd = buildReplClient(dpd);

  return commands;
};

function replEval(src, ctx, name, fn) {
  /* jshint evil:true*/
  let result;

  // first try to match a command
  // trim '(',')', and '\n'
  if (tryCommand(src.replace(/\(|\)|\n/g, ''))) {
    fn();
  } else {
    try {
      result = eval(src);
    } catch (e) {}
    fn(null, result);
  }
}


var commands = {
  help() {
    function pad(key) {
      let len = 0,
        padding = '';
      Object.keys(help).forEach((key) => {
        if (key.length > len) len = key.length;
      });
      len -= key.length;
      len += 10;
      while (padding.length < len) { padding += ' '; }
      return padding;
    }

    Object.keys(help).forEach((key) => {
      console.log(`\t${key}${pad(key)}${help[key]}`);
    });
  },

  resources() {
    server.resources && server.resources.forEach((r) => {
      if (r.config.type) console.log(`\t${r.path}`, `(${r.config.type})`);
    });
  },

  dashboard() {
    open('/dashboard/');
  },

  open() {
    open();
  },
};

function open(url) {
  url = url || '';
  _open(`http://localhost:${server.options.port}${url}`);
}

const help = {
  dashboard: 'open the resource editor in a browser',
  dpd: 'the server object',
  resources: 'list your resources',
};

function tryCommand(cmd) {
  console.info(cmd);
  if (commands[cmd]) {
    return commands[cmd]() || true;
  }
}

function buildReplClient(dpd) {
  let internalClientPath;
  try {
    if (dpd.deploydPath) {
      internalClientPath = resolve(path.join(dpd.deploydPath, 'lib/internal-client.js'), { basedir: process.cwd() });
    } else {
      internalClientPath = resolve('deployd/lib/internal-client.js', { basedir: process.cwd() });
    }
  } catch (e) {
    console.log('Could not find deployd/lib/internal-client.js');
    process.exit(99);
  }
  const internalClient = require(internalClientPath);

  const client = internalClient.build(dpd, { isRoot: true });

  Object.keys(client).forEach((key) => {
    Object.keys(client[key]).forEach((k) => {
      const orig = client[key][k];
      client[key][k] = function () {
        const args = Array.protoype.slice.call(arguments);
        if (typeof args[args.length - 1] !== 'function') {
          args[args.length] = function (res, err) {
            if (err) {
              console.log('Error', err);
            } else {
              console.log(res);
            }
          };
          args.length += 1;
        }
        orig.apply(client[key], args);
      };
    });
  });

  return client;
}
