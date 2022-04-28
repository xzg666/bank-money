import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import dicts from './modules/dict'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'
import notice from './modules/notice'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings,
    dicts,
    notice
  },
  getters
})

export default store
