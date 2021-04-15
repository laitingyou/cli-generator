const fs = require('fs-extra')
const path = require('path')
const servicePath = path.resolve(__dirname, '../', 'service')

const serviceLoader = function (ctx) {
    const services = fs.readdirSync(servicePath)
    services.map(item => {
        const Service = require(`${ servicePath }/${ item }`)
        ctx.service[Service.name] = new Service(ctx)
    })
}

module.exports = serviceLoader
