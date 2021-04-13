// const request = require('../utils/request')

const inquirer = require('inquirer')
const figures = require('figures')
const ora = require('ora')
const fs = require('fs-extra')
const clc = require("cli-color")
const Router = require('../core/routerDecorator')

class Auth {

  /**
   * 登录
   * @param cmd
   * @param opt
   */
  @Router({
    command: 'login',
    description: '登陆',
    middleware: ['auth', 'user']
  })
  async login(ctx, cmd, opt) {
    console.log(13, ctx)
    const self = this
    const {type} = await inquirer.prompt({
      type: 'list',
      name: 'type',
      choices: [
        {value: 'account', name: '账号密码登录'},
        {value: 'phone', name: '手机验证码登录'},
      ],
      message: '请选择登录方式：'
    })

    // ctx.loading = ora('正在登录...').start();
    ctx.loading.succeed('登录成功！')

  }

  /**
   * 退出登录
   * @returns {Promise<void>}
   */
  @Router({
    command: 'logout',
    description: '退出登陆'
  })
  async logout() {
    console.log(figures.tick + ' 登录已注销！')
  }
}

module.exports = Auth
