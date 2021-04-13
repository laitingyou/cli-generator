const serviceLoader = require('./serviceLoader')
const context = {
	service: {}
}
serviceLoader(context)
module.exports = context