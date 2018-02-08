import Vue from 'vue'
import Router from 'vue-router'
import login from 'page/login/login'
import register from 'page/login/register'
import register2 from 'page/login/register2'
import retrieval from 'page/login/retrieval'
import index from 'page/index'
import mall from 'page/mall'
import article from 'page/article/article'
import carInsuranceCheap from 'page/error/carInsuranceCheap'
import goodsDetail from 'page/goodsDetail'
import articleContent from 'page/article/articleContent'
import user from 'page/home/user'
import passChange from 'page/home/changepass'
import messageDetail from 'page/message/detail'
import carmessage from 'page/home/carmessage'
import more from 'page/home/more'
import opinion from 'page/home/opinion'
import about from 'page/home/about'
import recommend from 'page/home/recommend'
import task from 'page/home/myTask'
import coupon from 'page/home/myCoupon'
import couponDetail from 'page/message/couponDetail'
import cooperation from 'page/cooperation'
import loginServiceStandard from 'page/loginServiceStandard'
import registerPrivacyPolicy from 'page/registerPrivacyPolicy'
import carChange from 'page/home/carChange'
import map from 'page/home/map'

// pc页面
import redPage from '../webPage/redPage'
import pcIndex from '../webPage/index'
import config from 'config'
Vue.use(Router)
let AppRouter = null
let PCRouter = null
if (config.env === 'app') {
  AppRouter = new Router({
    history: true, // use history=false when testing
    saveScrollPosition: true,
    routes: [
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
        path: '/login/register',
        name: 'register',
        component: register
      },
      {
        path: '/login/retrieval',
        name: 'retrieval',
        component: retrieval
      },
      {
        path: '/home/mycar',
        name: 'carmessage',
        component: carmessage
      },
      {
        path: '/home/more',
        name: 'more',
        component: more
      },
      {
        path: '/home/about',
        name: 'about',
        component: about
      },
      {
        path: '/home/recommend',
        name: 'recommend',
        component: recommend
      },
      {
        path: '/home/myTask',
        name: 'task',
        component: task
      },
      {
        path: '/home/myCoupon',
        name: 'coupon',
        component: coupon
      },
      {
        path: '/home/opinion',
        name: 'opinion',
        component: opinion
      },
      {
        path: '/home/user',
        name: 'user',
        component: user
      },
      {
        path: '/message/detail',
        name: 'messageDetail',
        component: messageDetail
      },
      {
        path: '/message/coupondetail',
        name: 'couponDetail',
        component: couponDetail
      },
      {
        path: '/home/changepass',
        name: 'passChange',
        component: passChange
      },
      {
        path: '/',
        name: 'index',
        component: index
      },
      {
        path: '/mall',
        name: 'mall',
        component: mall
      },
      {
        path: '/article/article',
        name: 'article',
        component: article
      },
      {
        path: '/error/carInsuranceCheap',
        name: 'carInsuranceCheaP',
        component: carInsuranceCheap
      },
      {
        path: '/goodsDetail',
        name: 'goodsDetail',
        component: goodsDetail
      },
      {
        path: '/article/articleContent',
        name: 'articleContent',
        component: articleContent
      },
      {
        path: '/cooperation',
        name: 'cooperation',
        component: cooperation
      },
      {
        path: '/loginServiceStandard',
        name: 'loginServiceStandard',
        component: loginServiceStandard
      },
      {
        path: '/registerPrivacyPolicy',
        name: 'registerPrivacyPolicy',
        component: registerPrivacyPolicy
      },
      {
        path: '/carChange',
        name: 'carChange',
        component: carChange
      },
      {
        path: '/login/register2',
        name: 'register2',
        component: register2
      },
      {
        path: '/home/map',
        name: 'map',
        component: map
      }
    ]
  })
} else {
  PCRouter = new Router({
    routes: [
      {
        path: '/register',
        name: 'register',
        component: redPage
      },
      {
        path: '/',
        name: 'index',
        component: pcIndex
      }
    ]
  })
}

export default AppRouter || PCRouter
