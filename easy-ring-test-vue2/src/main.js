import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// require('easy-ring/easy-ring-default.wav')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
