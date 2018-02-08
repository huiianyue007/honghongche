import VueTk from 'vue-tk'
import router from '../router/index.js'
import store from '../store/index'
import config from 'config'
if (config.env === 'app') {
  const auth = [{
    match: '*',
    except: [
      '/login',
      '/login/register',
      '/login/retrieval',
      '/login/register2',
      '/registerPrivacyPolicy',
      '/loginServiceStandard'
    ],
    handler: function (route, next) {
      if (!store.state.userId || !store.state.sessionToken) {
        next(false)
      } else if (!store.state.userInfo) {
        next(false)
      } else if (!store.state.carInfo) {
        next('/login/register2')
      } else {
        next(true)
      }
    },
    fallbackUrl: '/login'
  }]
  VueTk.tkRouterAuth.init(auth, router)
}

