
<h1 align="center">
  <br>
  <a href="http://deployd.com"><img src="http://deployd.com/img/footer-logo.png" alt="Deployd" width="200"></a>
  <br>
  Deployd CLI
  <br>
</h1>

<h4 align="center">A Command Line Interface to create, update and start applications based on on <a href="http://deployd.com" target="_blank">Deployd</a>.</h4>

<p align="center">
  <a href="https://www.npmjs.org/package/deployd-cli">
    <img src="https://img.shields.io/npm/v/deployd-cli.svg?style=flat-square" alt="Current Version">
  </a>
  <a href="https://gitter.im/deployd/deployd">
    <img src="https://img.shields.io/gitter/room/deployd/deployd.svg?style=flat-square" alt="Gitter">
  </a>
  <a href="http://travis-ci.org/deployd/deployd-cli">
      <img src="https://img.shields.io/travis/deployd/deployd-cli.svg?style=flat-square" alt="Build Status">
  </a>
  <a href="https://github.com/airbnb/javascript">
    <img src="https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square" alt="Code Style">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="Make a PR">
  </a>
</p>
<br>


:warning: This CLI is very much a work in progress. Use it at your own risk.

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