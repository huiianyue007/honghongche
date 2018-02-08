let argv = JSON.parse(process.env.npm_config_argv).original
const args = {}
for (let v of argv) {
  if (/^--/.test(v)) {
    v = v.replace(/^--/, '')
    let [name, value] = v.split('=')
    args[name] = value
  }
}
process.env.args = JSON.stringify(args)
module.exports = JSON.stringify(args)
