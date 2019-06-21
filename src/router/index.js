import Vue from 'vue'
import Router from 'vue-router'
// 引入element
import UseElement from '../components/useElement/useElement.vue'
import Login from '../components/logins/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/useElement', name: 'useELement', component: UseElement},
    {path: '/login', name: 'login', component: Login}
  ]
})
