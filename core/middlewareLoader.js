const middlewareLoader = async function (middleware, context, callback) {
    if (middleware.length) {
        const mids = middleware.map(function (midName) {
            return require(`../middleware/${ midName }`)
        })
        const runMid = async function (middlewares, ctx) {
            const midItem = middlewares.splice(0, 1)
            if (midItem.length) {
                await midItem[0](ctx, async function () {
                    if (middlewares.length) {
                        await runMid(middlewares, ctx)
                    } else {
                        await callback(ctx)
                    }
                })
            } else {
                await callback(ctx)
            }
        }
        runMid(mids, context)
    } else {
        await callback(context)
    }

}

module.exports = middlewareLoader