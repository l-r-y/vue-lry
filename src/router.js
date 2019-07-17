import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: './login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
router.beforeEach((to, from, next) => {
  /**
   * 1.登录不拦截
   * 2.非登录验证 token 页面拦截
   * 2.1有token 放行 next
   * 2.2没有token 强制跳转到登录页面
   */
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
