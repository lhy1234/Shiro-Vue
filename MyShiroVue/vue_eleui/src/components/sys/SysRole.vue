<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="角色名">
        <el-input v-model="formInline.roleName" placeholder="角色名"></el-input>
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
            prop="roleName"
            label="角色名"
            width="180">
           </el-table-column>
          <el-table-column
              prop="roleCode"
              label="角色编码"
              width="180">
           </el-table-column>
          <el-table-column
                prop="description"
                label="角色描述"
                width="180">
           </el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                   <el-button
                     size="mini"
                     @click="handleEdit(scope.$index, scope.row)">用户</el-button>
                   <el-button
                     size="mini"
                     @click="showpermsDialog(scope.$index, scope.row)">授权</el-button>
                 </template>
               </el-table-column>
        </el-table>


        <!--授权弹框-->
        <el-dialog
          title="授权"
          :visible="permsDialogVisible"
          width="80%"
          :before-close="handleClose">
          <!--弹框内容-->
          <el-tree
            :data="treeData"
            show-checkbox
            ref="permsTree"
            node-key="id"
            :default-expanded-keys="expandedKeys"
            :default-checked-keys="checkedKeys"
            :props="defaultProps">
          </el-tree>

          <span slot="footer" class="dialog-footer">
            <el-button @click="permsDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRolePermission">确 定</el-button>
          </span>
        </el-dialog>

  </div>



</template>

<script>
   import axios from 'axios'
  export default {
       name: "SysRole",
        data() {
               return {
                   roleId : "",
                   lastPermissionIds:"",
                   permsDialogVisible: false ,//是否显示授权对话框
                   expandedKeys: [],//展开的菜单项
                   checkedKeys: [],//选中的菜单项
                   formInline: {  //表单数据
                           roleName: ''
                         },
                 tableData: [],
                 //树菜单
                 defaultProps: { //配置菜单属性
                   children: 'children',
                   label: 'name'
                 },
                 treeData: [],
               }
             },
      methods: {
        onSubmit() {
          list();
        },
        /////获取角色的权限，用于树菜单选中，和所有菜单，做展开用
        getRolePermission(roleId){
            //从vuex中的state中取出token,放在header
            let token = this.$store.state.currentUser.token;
            let url = 'http://localhost:8090/sys/permission/queryRolePermission?roleId='+roleId;
            axios.get(url,{headers: {'Authorization': token}
            }).then(resp => {
                if (resp) {
                  console.log("获取角色权限：：：："+JSON.stringify(resp.data))
                   this.expandedKeys = resp.data.permissionIds;
                   this.checkedKeys = resp.data.rolePermissionIds;
                   this.lastPermissionIds = resp.data.rolePermissionIds;
                }
            });
        },
        /////////////列表////////////////
        list(){
          //从vuex中的state中取出token,放在header
          let token = this.$store.state.currentUser.token;
          let url = 'http://localhost:8090/sys/roles/list';
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
        },
        //////弹框关闭事件///////////
        handleClose(){
          alert('close');
        },
         //////展示弹框///////////
        showpermsDialog(index,row){
          //console.log("row---------"+JSON.stringify(row))
          //从vuex中的state中取出token,放在header
          let token = this.$store.state.currentUser.token;
          let url = 'http://localhost:8090/sys/permission/permissionTree';
          axios.get(url, {headers: { 'Authorization': token}}).then(resp => {
              if (resp) {
                 console.log("授权获取菜单树---->"+JSON.stringify(resp));
                 this.treeData = resp.data;
              }
          });
          //展开、选中树
          this.roleId = row.id;
          this.getRolePermission(row.id)
          this.permsDialogVisible =true;
        },
        ////////保存授权//////
        saveRolePermission(){

          //获取选中的节点id数组this.$refs.permsTree.getCheckedKeys()

          console.log("treeee   "+JSON.stringify(this.$refs.permsTree.getCheckedKeys()))

          let token = this.$store.state.currentUser.token;
          let url = 'http://localhost:8090/sys/permission/saveRolePermission';
          axios.post(url,
          {
            roleId:this.roleId,
            newPermissionIds: this.$refs.permsTree.getCheckedKeys(),
            lastPermissionIds: this.lastPermissionIds
          },
          {headers: { 'Authorization': token}}
          ).then(resp => {
              if (resp) {
                //关闭弹框
                this.permsDialogVisible = false;
              }
          });

        }
      },
      mounted() {
        this.list();
      }
   }
</script>

<style>
</style>
