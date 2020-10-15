import axios from 'axios'






export const initMenu = (router,store) => {
    //如果store里面有菜单就不查了
    console.log("000000000 "+JSON.stringify(store.state.routes))
   if (store.state.routes.length > 0) {
      return;
   }
    //发送axios请求
    //从vuex中的state中取出token,放在header
     let token = store.state.currentUser.token;
    axios.get("http://localhost:8090/sys/permission/getUserPermissions",
      {
        headers: {
            'Authorization': token
        }
      }
    ).then((res)=>{
      console.log("-----"+JSON.stringify(res))
       if(res.code===200){
              //把返回的菜单格式化为组件,主要是处理component由字符串转为对象
              //用户的菜单
              var menuList = res.data.menuList;
              console.log(JSON.stringify(menuList))
              let fmtRoutes = formatRoutes(menuList);
              //动态添加路由
              router.addRoutes(fmtRoutes);
              //路由存到vuex里头
              store.commit('initRoutes', fmtRoutes);
              //用户的shiro权限
              var permissions = res.data.permissions;
              sessionStorage.setItem('permissions', JSON.stringify(permissions || '[]'))
       }
    });
}

export const formatRoutes = (routes) => {

    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array && children.length>0) { //这必须加个length>0,因为children[]
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children ,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../components/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../components/sys/' + component + '.vue'], resolve);
                }else if (component.startsWith("Project")) {
                    require(['../components/project/' + component + '.vue'], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
