import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const routeFiles = require.context('./', false, /([^(index)])\.js$/)
let arr = []
routeFiles.keys().forEach(key => {
  if (routeFiles(key).default.length) arr = arr.concat(routeFiles(key).default)
})
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...arr
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
