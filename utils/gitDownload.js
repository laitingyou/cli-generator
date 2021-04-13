const download = require('download-git-repo')
const path = require('path')
const fs = require('fs-extra')

const gitDownload = function (git, target = 'packages') {
  return new Promise((resolve, reject)=>{
    const name = git.match(/(?<=\/)([^\/]+)(?=\.git$)/)
    if(!name) reject('git地址有误')
    const downloadPath = path.resolve(target, name[0])
    if(fs.existsSync(downloadPath)) return reject(`目标路径已存在相同名称的${name[0]}`)
    download(`direct:${git}`, downloadPath, { clone: true }, function (err) {
      if(err) reject(err)
      resolve()
    })
  })
}

module.exports = gitDownload
