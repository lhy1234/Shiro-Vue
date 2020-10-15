<template>
    <div>
      <el-form ref="form" :model="user" label-width="80px">
         <h1>登录</h1>
         <h3>{{$store.state.count}}</h3>
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
          return {
            user: {
              username: '1222',
              password: '066185c464da20fb'
            }
          }
        },
        methods: {
          onSubmit() {
            console.log(this.user.username);
             axios.post("http://localhost:8090/sys/login",this.user).then((res)=>{

                  console.log("登录后 xxxx  "+JSON.stringify(res.data))
                   if(res.code===200){
                      this.$store.commit('INIT_CURRENT_USER', res.data);
                      window.sessionStorage.setItem("user", JSON.stringify(res.data));
                      let path = this.$route.query.redirect;
                      console.log("path:  " +path)
                      this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                   }else{
                      alert(res.data.message);
                      this.user.username="";
                      this.user.password="";
                   }
                });

          }
        }
      }
</script>

<style>
</style>
