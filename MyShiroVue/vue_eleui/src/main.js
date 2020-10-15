import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';


import { isAuth } from './utils/common.js' //引入commonjs

//把http请求的方法弄进来，好全局使用
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;

//导js
import {initMenu} from "./utils/menu";

// 挂载全局
Vue.prototype.isAuth = isAuth     // 权限方法
Vue.prototype.$http=axios; //修改内部的$http为axios  $http.get("") .post()

Vue.use(ElementUI);

Vue.config.productionTip = false


//router.beforeEach是路由的全局导航守卫，登录拦截，权限判断
//路由切换开始时调用
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
      next();
  } else {
      //判断是否登录
       if(window.sessionStorage.getItem("user")){
         initMenu(router, store);
         next();
      }else{
         next('/?redirect=' + to.path);
      }
  }
})

new Vue({
  el: '#app',
  router,
   store,
    render: h => h(App)
}).$mount('#app')
