import Vue from 'vue'
import VueTk from 'vue-tk'
import VueTkUI from 'vue-tkui'
import Meta from 'vue-meta'
import 'vue-tk/dist/vue-tk.css'
import 'vue-tkui/dist/vue-tkui.css'
import 'assets/scss/main.scss'
import * as filters from '../assets/js/filters'
import iconfont from '../assets/json/icon.json'
import router from '../router/index.js'
import error from '../page/error/error'
import loading from '../page/loading/loading'
import empty from '../page/empty/empty'
import parseJson from '../assets/json/parse.json'
import config from 'config'
Vue.use(VueTk)
Vue.use(VueTkUI)
Vue.use(Meta)
Vue.prototype.$tkIcon.setMode('material')
VueTk.history.init(router, {
  transtionMode: 'auto'
})
for (let name in filters) {
  let filter = filters[name]
  Vue.filter(name, filter)
}
VueTk.tkParse.init({
  baseURL: 'http://api.yoyoaiche.com',
  model: parseJson
})
VueTk.$tkAjaxGlobal.headers = {
  'X-Parse-Application-Id': 'F332P5ZgwJr7cmS5PD3zcf45wKzZpPNbjYqKm2D2',
  'X-Parse-REST-API-Key': '5FWxukEAf74jT9EHgtss8HVQP7AY8acx7HAh6w8w'
}
Vue.prototype.$cloudAjax = VueTk.tkAjax.create({
  baseURL: config.cloudUrl
})
Vue.prototype.$tkStatusBar.setColor('#149112')
VueTk.$tkContainer.status.error = error
VueTk.$tkContainer.status.loading = loading
VueTk.$tkContainer.status.empty = empty
function showToast () {
  window.plus.nativeUI.toast('再按一次退出应用', {duration: 'long'})
}
let waitClose = false
function backButtonHandler () {
  if (router.currentRoute.path === '/' || router.currentRoute.path === '/login') {
    if (waitClose) {
      window.plus.runtime.quit()
    } else {
      showToast()
      waitClose = true
      window.setTimeout(function () {
        waitClose = false
      }, 2000)
    }
  } else {
    router.back()
  }
}
let time = null
function resumeApp () {
  let resumeTime = new Date().getTime()
  if (resumeTime >= time) {
    window.plus.runtime.restart()
  }
}
function pauseApp () {
  let NowTime = new Date().getTime()
  time = NowTime + 21600000
}
if (window.plus) {
  window.plus.key.addEventListener('backbutton', backButtonHandler, false)
  if (VueTk.tkUa.isIos) {
    document.addEventListener('plusready', function () {
      document.addEventListener('resume', resumeApp, false)
      document.addEventListener('pause', pauseApp, false)
    }, false)
  }
  let splashscreenBool = true
  router.afterEach(function (to, from) {
    if (splashscreenBool) {
      window.plus.navigator.closeSplashscreen()
      splashscreenBool = false
    }
  })
}
Vue.prototype.$tkIcon.set({
  default: {
    // 开发时code与data必须设置其中一项，发布时必须设置data
    code: 377061, // iconfont 图标库id
    data: iconfont,
    type: 'private',
    useClassAsName: true
  }
})
