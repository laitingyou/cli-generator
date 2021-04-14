#!/usr/bin/env node
require('@babel/register')
const figures = require('figures')
const clc = require("cli-color")
const lerna = require('./lerna')
const controllerLoader = require('./core/controllerLoader')
const program = require('commander')

async function run() {
  const ctx = {
    service: {}
  }
  const controller = {}
  try {
    process.on('unhandledRejection', error => {
      if(ctx.loading) ctx.loading.fail()
      console.log(clc.red(`${figures.cross} 错误提示：%s`), error.message);
    });
    program.version(lerna.version, '-v, --version', 'Output the current version')
    .helpOption('-h, --help', 'View help information');
    controllerLoader({}, controller)
    program.on('command:*', function () {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
      process.exit(1);
    });
    program.parse(process.argv);
  } catch (error) {
    if(ctx.loading) ctx.loading.stop()
    console.log(clc.red(`${figures.cross} ERROR：%s`), error.message);
  }
}
run()





