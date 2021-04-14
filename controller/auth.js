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
        // this.ctx.loginByAccount()
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
