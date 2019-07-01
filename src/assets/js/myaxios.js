// 负责封装vue 的 xiaos 版本的插件

// 引入axiaos
import axios from 'axios'
// 定义一个插件对象
let MyPlugs = {}

MyPlugs.install = function (Vue) {
  // 向Vue中添加类容
  // 设置默认的 请求路径
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 设置默认的请求头
  // 这种设置只能能加载一次
  // axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
  axios.interceptors.request.use(function (config) {
    // config包含所有axios请求的一些数据
    // 在登录时不需要设置请求头里面的类容
    console.log(config)
    if (config.url !== 'login') {
      // 设置统一请求头
      config.headers.Authorization = window.localStorage.getItem('token')
    }

    return config
  })
  Vue.prototype.$http = axios
}
// 暴露出去
export default MyPlugs
