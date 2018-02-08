const E = require('../assets/E')
const utils = require('../assets/utils')
const tkAjax = require('vue-tk/dist/utils/tkAjax').default
const md5 = require('js-md5')
const config = require('../../configs/default').default
function ran (len) {
  let $chars = '1234567890'
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
module.exports = {
  async index (ctx) {
    ctx.body = 'test'
  },
  async exchangeCoupon (ctx) {
    if (!ctx.isParse || !ctx.isLogin) throw new E(400, '客户端未经过验证')
    let data = ctx.request.body
    let checked = utils.checkParams(data, [
      'couponId'
    ])
    if (!checked) throw new E(400, '参数错误')
    let couponId = data.couponId
    let res = await ctx.ajax.get(`/classes/coupon/${couponId}`).catch(() => {
      throw new E(400, '未能获取卡券信息，请重试')
    })
    let coupon = res.data
    let userScore = ctx.user.score ? parseInt(ctx.user.score) : 0
    let couponScore = coupon.score ? parseInt(coupon.score) : 0
    if (userScore < couponScore) {
      throw new E(400, '您的分数不足以兑换该卡券')
    }
    let couponCode = await ctx.ajax.post('/classes/couponCode', {
      user: ctx.user.objectId,
      coupon: couponId,
      status: 'ready',
      code: ran(10),
      'source': 'exchange'
    }).catch((e) => {
      throw new E(400, '生成卡券失败，请重试')
    })
    let rs = await ctx.ajax.put(`/users/${ctx.user.objectId}`, {
      'score': userScore - couponScore
    }).catch(() => {})
    if (!rs) {
      let delSuccess = await ctx.ajax.delete(`/classes/couponCode/${couponCode.data.objectId}`).catch((e) => {
        // 分数扣除失败后，卡券码也未能删除
        // 应纪录到日志中，由人工处理
      })
      if (delSuccess) {
        // 分数扣除失败后，删除生成卡券，回复前端生成失败
        throw new E(400, '生成卡券失败，请重试')
      }
    } else {
      await ctx.ajax.post('/classes/score', {
        'user': ctx.user.objectId,
        'number': couponScore,
        'type': 'reduce',
        'source': 'exchange',
        'coupon': couponId
      }).catch((e) => {})
    }
    ctx.body = '兑换成功'
  },
  async useCoupon (ctx) {
    if (!ctx.isParse) throw new E(400, '客户端未经过验证')
    let data = ctx.request.body
    let checked = utils.checkParams(data, [
      'code', 'id'
    ])
    if (!checked) throw new E(400, '参数错误')
    let code = data.code
    let id = data.id
    let res = await ctx.ajax.get(`/classes/couponCode/${id}`).catch((e) => {
      throw new E(400, '网络错误,请重试')
    })
    if (res.data.code === code) {
      await ctx.ajax.put(`/classes/couponCode/${id}`, {
        'status': 'used'
      }).catch((error) => {
        throw new E(400, '网络错误,请重试')
      })
      ctx.body = '兑换成功'
    } else {
      throw new E(400, '兑换码错误,请重试')
    }
  },
  async createOrder (ctx) {
    if (!ctx.isParse && !ctx.isLogin) throw new E(400, '客户端未经过验证')
    let data = ctx.request.body
    let checked = utils.checkParams(data, [
      'channel', 'couponId'
    ])
    if (!checked) throw new E(400, '参数错误')
    let app_id = config.beeCloudId
    let channel = data.channel
    let bill_no = Date.now().toString()
    let couponId = data.couponId
    let couponData = await ctx.ajax.get(`/classes/coupon/${couponId}`).catch((e) => {
      throw new E(400, '网络错误,请重试')
    })
    let orderRequest = {}
    orderRequest.app_id = config.beeCloudId
    orderRequest.timestamp = Date.now()
    orderRequest.app_sign = md5(app_id + orderRequest.timestamp + config.beeCloudSecret)
    orderRequest.channel = channel
    orderRequest.bill_no = bill_no
    orderRequest.total_fee = couponData.data.salePrice * 100
    orderRequest.title = couponData.data.type
    let orderData = await tkAjax.post('https://api.beecloud.cn/2/rest/bill', orderRequest).catch((e) => {
      throw new E(400, '创建订单失败,请重试')
    })
    if (channel === 'WX_APP') {
      let order = orderData.data
      let statement = {}
      statement.appid = order.app_id
      statement.noncestr = order.nonce_str
      statement.package = order.package
      statement.partnerid = order.partner_id
      statement.prepayid = order.prepay_id
      statement.timestamp = Number(order.timestamp)
      statement.sign = order.pay_sign
      let paySrc = JSON.stringify(statement)
      let params = {
        app_id: orderRequest.app_id,
        timestamp: orderRequest.timestamp,
        app_sign: orderRequest.app_sign
      }
      let urlData = encodeURIComponent(JSON.stringify(params))
      ctx.body = {
        'order': paySrc,
        'orderId': order.id,
        'urlData': urlData
      }
    }
  },
  async orderSuccess (ctx) {
    if (!ctx.isParse) throw new E(400, '客户端未经过验证')
    let data = ctx.request.body
    let checked = utils.checkParams(data, [
      'orderId', 'para', 'couponId', 'userId'
    ])
    if (!checked) throw new E(400, '参数错误')
    let orderId = data.orderId
    let para = data.para
    let couponId = data.couponId
    let userId = data.userId
    let couponCodeData = await ctx.ajax.post('/classes/couponCode', {
      'user': {
        '__type': 'Pointer',
        'className': '_User',
        'objectId': userId
      },
      'coupon': {
        '__type': 'Pointer',
        'className': 'coupon',
        'objectId': couponId
      },
      'status': 'ready',
      'code': ran(10),
      'source': 'buy'
    }).catch((e) => {
      throw new E(400, '创建卡券失败')
    })
    let url = 'https://api.beecloud.cn/2/rest/bill/' + orderId + '?para=' + para
    let res = await tkAjax.get(url)
    let orderData = res.data
    let price = orderData.pay.total_fee / 100
    await ctx.ajax.post('/classes/order', {
      'payID': orderData.pay.id,
      'user': userId,
      'coupon': couponId,
      'couponCode': couponCodeData.data.objectId,
      'totalAmount': price.toString(),
      'payType': orderData.pay.sub_channel,
      'beeCloudReturnData': JSON.stringify(res.data)
    }).catch((e) => {})
    ctx.body = '支付成功'
  },
  async invite (ctx) {
    let data = ctx.request.body
    let userId = data.userId
    let reward = 100
    let checked = utils.checkParams(data, [
      'phone', 'code', 'password'
    ])
    if (!checked) throw new E(400, '提交信息不完整')
    let rs = await ctx.ajax.post('/signinByPhone', data).catch(e => {
      throw new E(400, e.data.error)
    })
    ctx.body = 'success'
    let signInUserId = rs.data.objectId
    if (userId) {
      let user = await ctx.ajax.get('/users/' + userId).catch(() => {
        // do nothing
      })
      if (user) {
        let score = user.data.score ? user.data.score : 0
        let rs = await ctx.ajax.put('/users/' + userId, {
          score: score + reward
        }).catch(() => {})
        if (rs) {
          await ctx.ajax.post('/classes/score', {
            'user': userId,
            'number': reward,
            'type': 'increase',
            'source': 'share',
            'shareUser': signInUserId
          }).catch((e) => {})
        }
      }
    }
  }
}
