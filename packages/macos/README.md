# cli-generator
#### A framework that allows you to quickly generate command line interactive tools.

## Screenshot
![static/img.png](static/img.png)

## Features
- Generate executable file, support `Windows` `Linux` `MacOS` platform.
- Fast generation of interactive command line.
- Using `decorator` to write route command.

## Development
You can download the source code and build it yourself.
- Install [Node.js](https://nodejs.org/)
```bash
git clone https://github.com/laitingyou/cli-generator.git
cd ./cli-generator
yarn # or npm install
yarn link 

# test installed!
cli -h 
```

## Folder
- `/config` Configuration folder, you can define your project configuration.
- `/controller` Interaction logic layer，it is `M` layer in MVC framework.
- `/core` Framework core code.
- `/middleware` Routing middleware, you can write some verification logic here.
- `/packages` Executable file folder.
- `/service` Write your business layer.
- `/test` Unit testing.
- `/utils` Tool function of project.

## DEMO
- create `auth.js` in `/controller`
```javascript
const inquirer = require('inquirer')
const figures = require('figures')
const Router = require('../core/routerDecorator')

class Auth {

    @Router({
        command: 'login',
        description: '登陆',
        middleware: ['logger', 'checkToken']
    })
    async login(ctx, cmd, opt) {
        await inquirer.prompt({
            type: 'list',
            name: 'type',
            choices: [
                { value: 'account', name: '账号密码登录' },
                { value: 'phone', name: '手机验证码登录' },
            ],
            message: '请选择登录方式：'
        })
        ctx.loading.succeed('登录成功！')
    }

    @Router({
        command: 'logout',
        description: '退出登陆'
    })
    async logout() {
        console.log(figures.tick + ' 登录已注销！')
    }
}

module.exports = Auth
```
- create `logger.js` `checkToken.js` in `/middleware`.

logger.js
```javascript
module.exports = async function (ctx, next) {
  console.log('input')
  await next()
  console.log('output')
}
```
checkToken.js
```javascript
module.exports = async function (ctx, next) {
    console.log('check token')
    await next()
}
```
- Command line input `cli login`
```bash
~zsh% cli login
input
check token
? 请选择登录方式： (Use arrow keys)
❯ 账号密码登录 
  手机验证码登录
```

## Build
Generate executable file to `/packages` folder.
```bash
# output executable file for window
yarn build:win

# output executable file for mac
yarn build:macos

# output executable file for linux
yarn build:linux

# output executable file for all
yarn build:all
```

## Advanced
- `@Router` Write command line routing and middleware and so on.
```javascript
@Router({
        command: 'login', 
        description: '登陆',
        middleware: ['logger', 'checkToken']
    })
```
- `ctx` In the controller, it can be used to obtain configuration and services.
```javascript
@Router({
        command: 'login',
        description: '登陆',
        middleware: ['logger', 'checkToken']
    })
async login(ctx, cmd, opt) {
   console.log(ctx.service.Login)
   console.log(ctx.config)
}
```

## Environment
Different environments correspond to different configurations.default `prod`

use `-e` option:

`cli login -e dev`

or use `process.NODE_NEV`:

`process.NODE_NEV = dev`

## License
Everything is MIT.
