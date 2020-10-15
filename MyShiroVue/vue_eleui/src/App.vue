<template>
  <div id="app">
      <router-view/>
   </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      routers:JSON.parse(sessionStorage.getItem('routers'))
    }
  }

}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
