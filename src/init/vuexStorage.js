import tkStorage from 'vue-tk/dist/utils/tkVuexStorage'
import config from 'config'
import store from '../store/index'
import VueTk from 'vue-tk'
tkStorage.init(store, config.vuexStorageKeys)
let storageStore = tkStorage.restoreStorage()
store.commit('initFromStorage', storageStore)
if (storageStore && storageStore['sessionToken']) {
  VueTk.$tkAjaxGlobal.headers['X-Parse-Session-Token'] = storageStore['sessionToken']
}

