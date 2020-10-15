<template>
    <div>
     <!--容器-->
     <el-container style="height: 500px; border: 1px solid #eee">
       <!--侧边栏布局-->
       <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
           <!--
           导航菜单
           属性:
           router :是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
           unique-opened	是否只保持一个子菜单的展开
           -->
           <el-menu router unique-opened>
               <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                   <template slot="title">
                       <i style="color: #409eff;margin-right: 5px" :class="item.iconCls"></i>
                       <span>{{item.name}}</span>
                   </template>
                   <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                       {{child.name}}
                   </el-menu-item>
               </el-submenu>
           </el-menu>
       </el-aside>

       <el-container>
         <el-header style="text-align: right; font-size: 12px">
           <el-dropdown>
             <i class="el-icon-setting" style="margin-right: 15px"></i>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>查看</el-dropdown-item>
               <el-dropdown-item>新增</el-dropdown-item>
               <el-dropdown-item>删除</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
           <span>王小虎</span>
         </el-header>

         <el-main>
               <router-view/>
         </el-main>
       </el-container>
     </el-container>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
     return {
         // user: JSON.parse(window.sessionStorage.getItem("user"))
     }
   },
   computed: {
       routes() {
           return this.$store.state.routes;
       },
       user() {
           return this.$store.state.currentUser;
       }
   },
  methods: {
  }
}
</script>

<style scoped>

</style>
