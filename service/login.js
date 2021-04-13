const fs = require('fs-extra')
const request = require('../utils/request')

class Login {
  async loginByAccount(body){
    try {
      const res = await request.call(this, {
        api: 'login',
        method: 'POST',
        body
      }, false)
      fs.outputJsonSync(this.config.authPath, res)
    }catch (e) {
      throw new Error(e.message)
    }

  }

  async sendCode(body){
    try {
      await request.call(this, {
        api: 'sendCode',
        method: 'POST',
        body
      }, false)
      console.log('验证码已发送，请查收！')
    }catch (e) {
      throw new Error(e.message)
    }
  }

  async loginByPhone(body){
    try {
      const res = await request.call(this, {
        api: 'quickLogin',
        method: 'POST',
        body
      }, false)
      fs.outputJsonSync(this.config.authPath, res)
    }catch (e) {
      throw new Error(e.message)
    }

  }
}

module.exports = Login
