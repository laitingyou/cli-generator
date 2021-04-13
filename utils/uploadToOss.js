const aliOSS = require('ali-oss');
const fs = require('fs-extra')
const path = require('path')

const getFiles = function(target, result= [ ]) {
  const files = fs.readdirSync(target)
  files.forEach((name) => {
    const isDir = fs.statSync(path.join(target, name)).isDirectory()
    if (isDir) {
      getFiles(path.join(target, name), result)
    } else {
      result.push(`${path.join(target, name)}`)
    }
  })
  return result
}


const uploadToOss = async function(folder, id, distName) {
    try {
      const {
        region,
        bucket,
        key,
        secret,
        metaPath,
        domain
      } = this.ctx.config.oss;
      const client = new aliOSS({
        region,
        bucket,
        accessKeyId: key,
        accessKeySecret: secret,
      });
      const files = getFiles(folder, [])

      for(const file of files){
        // 兼容window
        const uploadPath = path.relative(path.resolve(), file).replace(distName, '').replace(/[\\/]/g, '/')
        const res = await client.put(`${metaPath}/${id}${uploadPath}`, file, {
          parallel: 1,
          partSize: 1024 * 1024 * 1024,
        });
      }
      return `${domain}/${id}/index.html`

    } catch (e) {
      throw new Error(e.message);
    }

  }

module.exports = uploadToOss;
