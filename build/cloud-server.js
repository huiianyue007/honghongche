const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const reload = require('require-nocache')(module)
app.use(koaBody())

function cors (ctx) {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200
    ctx.set('Access-Control-Allow-Headers', 'X-Parse-Master-Key, X-Parse-REST-API-Key, X-Parse-Javascript-Key, X-Parse-Application-Id, X-Parse-Client-Version, X-Parse-Session-Token, X-Requested-With, X-Parse-Revocable-Session, Content-Type')
    ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', true)
    return false
  } else {
    ctx.set('Access-Control-Allow-Origin', '*')
    return true
  }
}

app.use(async (ctx) => {
  let next = cors(ctx)
  if (!next) return
  try {
    let midware = reload('../src/cloud/assets/midware')
    let rt = await midware(ctx)
    if (rt === false) return
    let [, controller = 'index',, action = 'index'] = ctx.request.url.match(/\/([\w\-]+)(\/([\w\-]+))?/) || []
    let cloudCode = reload('../src/cloud/code/' + controller)
    if (cloudCode && cloudCode[action]) {
      await cloudCode[action](ctx)
    } else {
      ctx.status = 400
      ctx.body = '云代码错误'
    }
  } catch (e) {
    ctx.status = e.status
    ctx.body = e.message
  }
})

let port = process.env.npm_config_cloudPort ? process.env.npm_config_cloudPort : 13133
app.listen(port)
console.log('cloud服务已启动，端口号：' + port)
