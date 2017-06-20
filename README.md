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

## Using the dashboard

```bash
$ npm i dpd-dashboard dpd-clientlib --save
$ dpd -d
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details