import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)



export default new Router({
  routes: [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true
    },
    {
          path: '*',
          redirect: '/home'
    }
  ]
})
