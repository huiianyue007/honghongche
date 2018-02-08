import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    result: null,
    sessionToken: null,
    userId: null,
    userInfo: null,
    myTask: null,
    nickname: '',
    carId: '',
    couponPrice: '',
    carInfo: null,
    homeHeight: 1,
    infiniteScroll: 'enable',
    loadingMore: null,
    // 消息列表
    message: [],
    myCoupon: [],
    myTaskMessage: [],
    healthKonwledge: [],
    carMaintain: []
  },
  getters: {},
  mutations: {
    putCarInfo (state, obj) {
      let key = Object.keys(obj)[0]
      state.carInfo[key] = obj[key]
    },
    putUserInfo (state, obj) {
      let key = Object.keys(obj)[0]
      state.userInfo[key] = obj[key]
    },
    setResult (state, opt) {
      state.result = opt
    },
    setUserId (state, opt) {
      state.userId = opt
    },
    setSessionToken (state, opt) {
      state.sessionToken = opt
    },
    setUserInfo (state, opt) {
      state.userInfo = opt
    },
    setMyTask (state, opt) {
      state.myTask = opt
    },
    setCarId (state, opt) {
      state.carId = opt
    },
    setCouponPrice (state, opt) {
      state.couponPrice = opt
    },
    setCarInfo (state, opt) {
      state.carInfo = opt
    },
    setHomeHeight (state, opt) {
      state.homeHeight = opt
    },
    setInfiniteScroll (state, opt) {
      state.infiniteScroll = opt
    },
    setLoadingMore (state, opt) {
      state.loadingMore = opt
    },
    initFromStorage (state, opt) {
      for (let i in opt) {
        state[i] = opt[i]
      }
    },
    addMessage (state, opt) {
      state.message = state.message.concat(opt)
    },
    addCoupon (state, opt) {
      state.myCoupon = state.myCoupon.concat(opt)
    },
    addTask (state, opt) {
      state.myTaskMessage = state.myTaskMessage.concat(opt)
    },
    addHealthKonwledge (state, opt) {
      state.healthKonwledge = state.healthKonwledge.concat(opt)
    },
    addCarMaintain (state, opt) {
      state.carMaintain = state.carMaintain.concat(opt)
    }
  },
  actions: {}
})
export default store
