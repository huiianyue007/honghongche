let tkParse = require('vue-tk/dist/utils/tkParse')
let config = require('./config')
tkParse.default.init(config)
module.exports = async function (ctx) {
  ctx.status = 200
  ctx.ajax = tkParse.default
  if (ctx.header['x-parse-application-id'] === config.appId && ctx.header['x-parse-rest-api-key'] === config.restKey) {
    ctx.isParse = true
    if (ctx.header['x-parse-master-key'] === config.masterKey) {
      ctx.isMaster = true
    }
    if (ctx.header['x-parse-session-token']) {
      ctx.isLogin = true
      tkParse.default.setSessionToken(ctx.header['x-parse-session-token'])
      let res = await tkParse.default.get('/users/me').catch((e) => {
        ctx.isLogin = false
      })
      if (res) {
        ctx.user = res.data
      }
    }
  }
}
