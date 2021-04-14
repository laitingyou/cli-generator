const program = require('commander')
const fs = require('fs-extra')
const path = require('path')
const context = require('./context')
const controllers = {}
const router = function ({ command, description, middleware = [] }) {
    return function (target, name, descriptor) {
        if (!controllers[target.constructor.name]) {
            controllers[target.constructor.name] = new target.constructor()
        }
        program
            .command(command)
            // .option(item.flags, "Which setup mode to use")
            .description(description)
            .action(async function (...args) {
                require('../core/middlewareLoader')(middleware, context, async function (ctx) {
                    const callback = descriptor.value
                    await callback.call(controllers[target.constructor.name], ctx, ...args)
                })
            })
    }
}


module.exports = router