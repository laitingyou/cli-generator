#!/usr/bin/env node
require('@babel/register')
const fs = require('fs-extra')
const deepmerge = require('deepmerge')
const figures = require('figures')
const clc = require("cli-color")
const argv = require('yargs-parser')(process.argv.slice(2))
const ENV = argv.e || 'prod'
const defaultConfig = require('./config/config.default')
const lerna = require('./lerna')
const serviceLoader = require('./core/serviceLoader')
const controllerLoader = require('./core/controllerLoader')
const program = require('commander')
const router = require('./router')
let config = {}
if (fs.existsSync(`./config/config.${ENV}.js`)) {
  const extendConfig = require(`./config/config.${ENV}`)
  config = deepmerge(defaultConfig, extendConfig)
} else {
  config = defaultConfig
}
async function run() {
  const ctx = {
    config,
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
    // if (config.middleware && config.middleware.length) {
    //   const queue = []
    //   for (let i = 0; i < config.middleware.length; i++) {
    //     if(!argv._.length && ( argv.h || argv.help || argv.v) ){
    //       break
    //     }
    //     const {name, ignore} = config.middleware[i]
    //     const mid = require(`./middleware/${name}`)
    //     if(ignore){
    //       if(ignore.includes(argv._[0])){
    //         continue
    //       }
    //     }
    //     queue.push(mid)
    //   }

    //   async function dispatch(i) {
    //     const fn = queue[i]
    //     await fn(ctx, async function () {
    //       if (i === queue.length - 1) {
    //         serviceLoader(ctx)
    //         controllerLoader(ctx, controller)
    //         router(controller)
    //         return
    //       }
    //       await dispatch(i + 1)
    //     })
    //   }

    //   if(queue.length === 0){
    //     serviceLoader(ctx)
    //     controllerLoader(ctx, controller)
    //     router(controller)
    //   }else {
    //     await dispatch(0)
    //   }

    // }else {
    //   serviceLoader(ctx)
    //   controllerLoader(ctx, controller)
    //   router(controller)
    // }
    controllerLoader({}, controller)
    program.on('command:*', function () {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
      process.exit(1);
    });
    program.parse(process.argv);
  } catch (error) {
    if(ctx.loading) ctx.loading.stop()
    console.log(clc.red(`${figures.cross} ERROR：%s`), error.message);
  } finally {
    //
  }
}
run()





