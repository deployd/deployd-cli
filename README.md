# deployd-cli

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/deployd/deployd)
[![Current Version](https://img.shields.io/npm/v/deployd-cli.svg?style=flat-square)](https://www.npmjs.org/package/deployd-cli)
[![Build Status](https://img.shields.io/travis/deployd/deployd-cli.svg?style=flat-square)](http://travis-ci.org/deployd/deployd-cli)

> The [Deployd](http://www.deployd.com) Command Line Interface

:warning: This CLI is very much a work in progress. Use it at your own risk. The nodule name might change.

## Installation

`npm install dpd-cli -g`

## Prerequisites

The CLI requires [Node 4](https://nodejs.org/en/download/) or higher.  
Deployd requires a running MongoDB to start sucessfully. Check the [Deployd Requirements](https://github.com/deployd/deployd#requirements)

## Getting started

```bash
$ dpd create hello
$ cd hello
$ dpd
```

### Using the dashboard

```bash
$ npm i dpd-dashboard dpd-clientlib --save
$ dpd -d
```

To start dpd with  Database authentication:

```
dpd --host "127.0.0.1" -P '27017' -n "mymongodb" -u "myusername" -s "mypassword"

or

dpd --host "127.0.0.1" -P '27017' -n "mymongodb" -a "myusername:mypassword"

```

## dpd Command Options

```
 Usage: dpd [options] [command]


  Options:

    -V, --version                      output the version number
    -m, --mongod [path]                path to mongod executable (defaults to `mongod`)
    -p, --port [port]                  port to host server (defaults to 2403)
    -w, --wait                         wait for input before exiting
    -d, --dashboard                    start the dashboard immediately
    -o, --open                         open in a browser
    -e, --environment [env]            defaults to development
    -H, --host [host]                  specify host for mongo server
    -P, --mongoPort [mongoPort]        mongodb port to connect to
    -n, --dbname [dbname]              name of the mongo database
    -a, --auth <auth>                  usesrname:password mongo server credentials
    -u, --username <username>          The user to authenticate as
    -s, --password <password>          The user's password
    -c, --dbconn <dbconnectionstring>  The MongoDB Connection String
        --deploydPath [deploydPath]    allow overriding the path to deployd main script
    -h, --help                         output usage information


  Commands:

    create [project-name]       create a project in a new directory
        eg. `dpd create my-app`
    keygen                      generate a key for remote access (./.dpd/keys.json)
    showkey                     shows current key for connecting to remote dashboard (./.dpd/keys.json)
    *                           [default] start the server in the current project in development mode
        with an interactive shell/repl for interacting with the running server
        e.g. dpd (starts server in current directory),
             dpd my-app/app.dpd (starts app from file)
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details