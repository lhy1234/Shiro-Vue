<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
         <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
         <el-button v-if="isAuth('sys:user:delete')" type="primary" @click="addOrUpdateHandle()">删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="username"
            label="账号"
            width="180">
           </el-table-column>
          <el-table-column
              prop="realname"
              label="姓名"
              width="180">
           </el-table-column>
          <el-table-column
                prop="avatar"
                label="头像"
                width="180">
           </el-table-column>
          <el-table-column
                prop="sex"
                label="性别"
                width="180">
           </el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="180">
          </el-table-column>


          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
   import axios from 'axios'
  export default {
       name: "SysUser",
        data() {
               return {
                   formInline: {
                           user: '',
                           region: ''
                         },
                 tableData: []
               }
             },
      methods: {
        onSubmit() {
          userList();
        },
        userList(){
          //从vuex中的state中取出token,放在header
           let token = this.$store.state.currentUser.token;

          let url = 'http://localhost:8090/sys/users/list';
          axios.get(url,
          {
            headers: {
                'Authorization': token
            }
          }).then(resp => {
              if (resp) {
                 console.log(resp);
                 this.tableData = resp.data.records;

              }
          });
        }
      },
      mounted() {
        this.userList();
      }
   }
</script>

<style>
</style>
