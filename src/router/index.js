import Vue from 'vue'
import Router from 'vue-router'
// 引入element
const UseElement = () => import('../components/useElement/useElement.vue')
const Login = () => import('../components/logins/login.vue')
const Home = () => import('../components/home/home.vue')
const Users = () => import('../components/users/users.vue')
const Rights = () => import('../components/rights/rights.vue')
const roles = () => import('../components/powerRoles/roles.vue')
const categories = () => import('../components/categories/categories.vue')
const Goods = () => import('../components/goods/goods.vue')
const AddGoods = () => import('../components/addGoods/addGoods.vue')
const orders = () => import('../components/orders/orders.vue')
const reports = () => import('../components/reports/reports.vue')

Vue.use(Router)
// 创建一个路由对象
let router = new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/useElement', name: 'useELement', component: UseElement},
    {path: '/login', name: 'login', component: Login},
    {path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/users', name: 'users', component: Users},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: roles},
        {path: '/categories', name: 'categories', component: categories},
        {path: '/goods', name: 'goods', component: Goods},
        {path: '/goods/addGoods', name: 'addGoods', component: AddGoods},
        {path: '/orders', name: 'orders', component: orders},
        {path: '/reports', name: 'reports', component: reports}
      ]}
  ]
})
// 添加一个路由守卫中的全局守卫
router.beforeEach(function (to, from, next) {
  // to:目标路由
  // from:请求发起的路由
  // next:后续是否执行
  // 验证是否登录：原理判断是否在 token
  // 判断目标路劲是否是login，如果是 ｌｏｇｉ直接向后执行
  if (to.name !== 'login') {
    let token = window.localStorage.getItem('token')
    if (!token) {
      this.push('./login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
