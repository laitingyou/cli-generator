const fs = require('fs-extra')
const path = require('path')
const controllerPath = path.resolve(__dirname, '../', 'controller')

const controllerLoader =  function (ctx, app = {}) {
  const controllers = fs.readdirSync(controllerPath)
  controllers.map(item => {
    const Controller = require(`${controllerPath}/${item}`)
    new Controller(ctx)
  })
  
}

module.exports = controllerLoader
