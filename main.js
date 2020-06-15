import Vue from 'vue'
import App from './App'

import addcases from './pages/case/case.vue'
Vue.component('addcase',addcases)

import cases from './pages/case/caselist.vue'
Vue.component('case',cases)

import books from './pages/book/book.vue'
Vue.component('book',books)

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

 



