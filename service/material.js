const request = require('../utils/request')
const fs = require('fs-extra')


class Material {

  async getMaterialList(params){
    try {
      const res = await request.call(this, {
        api: 'search',
        method: 'GET',
        params
      })
      return res
    }catch (e) {
      throw new Error(e.message)
    }
  }

  async publish(body){
    try {

      // console.log(packageJson)
      const res = await request.call(this, {
        api: 'publish',
        method: 'PUT',
        headers: {
          // 'content-type': 'multipart/form-data'
        },
        formData:body,
        // formData: {
        //   name: packageJson.name,
        //   readme: {
        //      value: fs.createReadStream(readmePath),
        //      options: { filename: 'README.md', contentType: null }
        //   }
        // }
      })
    }catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = Material
