import Vue from 'vue'
import Router from 'vue-router'
// 引入element
import UseElement from '../components/useElement/useElement.vue'
import Login from '../components/logins/login.vue'
import Home from '../components/home/home.vue'
import User from '../components/users/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Home},
    {path: '/useElement', name: 'useELement', component: UseElement},
    {path: '/login', name: 'login', component: Login},
    {path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/user', name: 'suer', component: User}
      ]}
  ]
})
