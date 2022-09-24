import Vue from 'vue'
import VueRouter from 'vue-router'
// import Demo from '../views/ComponentDemo.vue'
import Demo from '../views/CommonDemo.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Demo',
    component: Demo
  }
]

const router = new VueRouter({
  routes
})

export default router
