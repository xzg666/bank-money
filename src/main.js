import Vue from 'vue'

import Cookies from 'js-cookie'

import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'
import Element from 'element-ui'
import Plugin from 'v-fit-columns';
import Print from 'vue-print-nb'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/ruoyi";
import { setSelectOptions } from '@/utils/handleData'
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
//公共样式
import './style/index.scss'
// 全局方法挂载
Vue.prototype.$getDicts = getDicts
Vue.prototype.$getConfigKey = getConfigKey
Vue.prototype.$parseTime = parseTime
Vue.prototype.$resetForm = resetForm
Vue.prototype.$addDateRange = addDateRange
Vue.prototype.$selectDictLabel = selectDictLabel
Vue.prototype.$selectDictLabels = selectDictLabels
Vue.prototype.$setSelectOptions = setSelectOptions
Vue.prototype.$download = download
Vue.prototype.$handleTree = handleTree
Vue.prototype.$iframeBaseUrl = `https://www.hncydb.com/cydbliuhaovue`

Vue.prototype.$msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.$msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.$msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)
Vue.use(VueMeta)
Vue.use(Plugin)
Vue.use(Print)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.use(formCreate);
Vue.use(FcDesigner);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
