const serviceLoader = require('./serviceLoader')
const fs = require('fs-extra')
const deepmerge = require('deepmerge')
const argv = require('yargs-parser')(process.argv.slice(2))
const defaultConfig = require('../config/config.default')
const ENV = argv.e || process.NODE_ENV || 'prod'
let config = {}
if (fs.existsSync(`../config/config.${ENV}.js`)) {
	const extendConfig = require(`./config/config.${ENV}`)
	config = deepmerge(defaultConfig, extendConfig)
} else {
	config = defaultConfig
}
const context = {
	service: {},
	config: Object.freeze(config)
}
serviceLoader(context)
module.exports = context