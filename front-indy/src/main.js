import Vue from 'vue'
import App from './App.vue'

// Vuex Store
import store from './store/store'
import router from './router'
import axios from './helpers/api'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
