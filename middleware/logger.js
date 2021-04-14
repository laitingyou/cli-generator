module.exports = async function (ctx, next) {
    console.log('input')
    await next()
    console.log('output')
}
