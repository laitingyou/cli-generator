const { spawn, spawnSync } = require('child_process')
const path = require('path')

const build = async function () {
    const data = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
        cwd: path.resolve(),
        stdio: 'inherit'
    })
    if (data.status !== 0) throw new Error('build fail')
}

module.exports = build
