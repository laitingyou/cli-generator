const userHome = require('user-home')

module.exports = {

  authPath: `${userHome}/.auth.json`,

  middleware:[
    {
      name: 'auth',
      ignore: [
        'login',
        'logout'
      ]
    },
    {
      name: 'user',
      ignore: [
        'logout'
      ]
    }
  ],
  baseUrl: '',
  oss: {
    metaPath: 'materials',
    key: 'LTAIDaNPDF5dEZYh',
    secret: 'XkPBHvP9olBO6pTH6B39QjIsepKDcl',
    bucket: '',
    region: 'oss-cn-zhangjiakou',
    // endpoint:'',
    domain: '',
  }
}
