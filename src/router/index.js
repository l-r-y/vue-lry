import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import Welcome from '../views/home/welcome'
import categories from '../views/home/categories'
import goods from '../views/home/goods'
import orders from '../views/home/orders'
import params from '../views/home/params'
import reports from '../views/home/reports'
import roles from '../views/home/roles'
import users from '../views/home/users'
import rights from '../views/home/rights'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: './login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/categories',
      component: categories
    },
    {
      path: '/goods',
      component: goods
    }, {
      path: '/orders',
      component: orders
    }, {
      path: '/params',
      component: params
    }, {
      path: '/reports',
      component: reports
    }, {
      path: '/rights',
      component: rights
    },
    {
      path: '/roles',
      component: roles
    },
    {
      path: '/users',
      component: users
    }
    ]
  }
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
