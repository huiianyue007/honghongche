// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import config from 'config'
import VueTk from 'vue-tk'
import 'babel-polyfill'
Vue.config.productionTip = false
/* eslint-disable no-new */
function initVue () {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}
let promiseArr = []
let UAPromise = new Promise(function (resolve) {
  if (!VueTk.tkUa.isPlus) resolve()
  if (window.plus) {
    resolve()
  } else {
    document.addEventListener('plusready', function () {
      resolve()
    }, false)
  }
})
promiseArr.push(UAPromise)
config.initPlugins.map((item) => {
  let a = require('./init/' + item)
  if (a && a.default) {
    promiseArr.push(a.default)
  }
})
function runPromise (promiseArr, index) {
  let promiseFun = promiseArr[index]
  if (promiseFun.then) {
    return promiseFun.then(() => {
      if (index === promiseArr.length - 1) {
        initVue()
      } else {
        index++
        return runPromise(promiseArr, index)
      }
    })
  } else {
    if (index === promiseArr.length - 1) {
      initVue()
    } else {
      index++
      return runPromise(promiseArr, index)
    }
  }
}
runPromise(promiseArr, 0)
