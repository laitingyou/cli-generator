const fs = require('fs-extra')

module.exports = async function (ctx, next) {
	// console.log(ctx)
	// console.log(context.ctx)
	console.log('authIN')
	ctx.loading = ''
	// this.ctx
  await next()
  console.log('authOUt')
  // console.log(ctx)
}
