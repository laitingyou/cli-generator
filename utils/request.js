const request = require('request-promise')
const fs = require('fs-extra')

const apis = {
    login: () => '/user-server/api/v1/account/login',
    publish: () => '/material-server/api/v1/materials',

}

const getToken = async function (token){
    if(!token) return null
    return this.auth.token
}

const rp = async function (opt = {}, token = true){
    try {
        const res = await request({
            method: opt.method,
            uri:  this.config.baseUrl + apis[opt.api](opt.params),
            body: opt.body,
            qs: opt.params,
            formData: opt.formData,
            headers: {
                'Authorization': `Bearer ${opt.token || await getToken.call(this, token)}`,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
                ...opt.headers
            },
            json: true,
            timeout: 10000
        })
        return res.payload || res.data

    }catch (e) {
        if(e.statusCode === 401){
            throw new Error('登录过期，请重新登录再操作吧！')
        }
        let message = `${opt.api}服务调用失败`
        if(e.error) {
           message = e.error.msg || e.error.message
        }else if(e.message){
           message = e.message
        }
       throw new Error(message)
    }


}

module.exports = rp
