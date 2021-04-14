module.exports = async function (ctx, next) {
    // check token
    console.log('check token')
    await next()
}
