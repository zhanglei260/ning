import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cases from './pages/basics/home.vue'
Vue.component('case',cases)
import books from './pages/component/home.vue'
Vue.component('book',books)
import addcases from './pages/case/case.vue'
Vue.component('addcase',addcases)
import crms from './pages/crm/crm.vue'
Vue.component('crm',crms)
import mys from './pages/my/my.vue'
Vue.component('my',mys)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



