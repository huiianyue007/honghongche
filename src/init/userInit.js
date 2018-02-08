import VueTk from 'vue-tk'
import store from '../store/index'
export default new Promise(async function (resolve) {
  if (!store.state.userId || !store.state.sessionToken) {
    resolve()
    return false
  }
  let res = await VueTk.tkParse.get(`/users/${store.state.userId}`).catch(() => {
    VueTk.$tkAjaxGlobal.headers['X-Parse-Session-Token'] = ''
    resolve()
    return false
  })
  store.commit('setUserInfo', res.data)
  let carData = await VueTk.tkParse.get('/classes/car', {
    params: {
      include: 'user',
      where: {
        user: store.state.userId
      }
    }
  }).catch(() => {
    resolve()
    return false
  })
  store.commit('setCarInfo', carData.data.results[0])
  resolve()
})

