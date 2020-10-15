<template>
  <div>

 <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
         <el-button v-if="isAuth('sys:user:save')" type="primary" @click="clickAddMenu">新增</el-button>
      </el-form-item>
  </el-form>

    <el-table  :data="tableData"  style="width: 100%;margin-bottom: 20px;"  row-key="id"   border  default-expand-all  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column  prop="name"  label="菜单名称"  sortable  width="180"></el-table-column>
      <el-table-column  prop="menuType"  label="菜单类型"  sortable  :formatter="menuTypeFormatter"  width="180"></el-table-column>
      <el-table-column  prop="icon"  label="图标"> </el-table-column>
      <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button
               size="mini"
               v-if="showOpt(scope.$index, scope.row)"
               @click="addChildMenu(scope.$index, scope.row)">添加下级</el-button>
            <!-- <el-button
               size="mini"
               @click="showpermsDialog(scope.$index, scope.row)">授权</el-button> -->
           </template>
         </el-table-column>
    </el-table>


    <!--新增弹框-->
    <el-dialog
      title="新增菜单"
      :visible="daialogVisible"
      width="60%"
      :before-close="handleClose">
      <!--弹框内容-->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单类型">
            <el-radio-group v-model="form.menuType">
              <el-radio :label="0" >一级菜单</el-radio>
              <el-radio :label="1" >子菜单</el-radio>
              <el-radio :label="2" >按钮/权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="form.name" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
                <el-input v-model="form.parentName" placeholder="一级菜单不填"></el-input>
          </el-form-item>
         <el-form-item label="菜单路径">
           <el-input v-model="form.path" placeholder="按钮不填此项"></el-input>
         </el-form-item>
         <el-form-item label="前端组件">
           <el-input v-model="form.component" placeholder="按钮不填此项"></el-input>
         </el-form-item>
         <el-form-item label="授权标识">
           <el-input v-model="form.perms" placeholder="[按钮] 才填此项"></el-input>
         </el-form-item>
         <el-form-item label="菜单图标">
            <el-input v-model="form.icon" placeholder="按钮不填此项"></el-input>
         </el-form-item>
         <el-form-item label="排序号">
            <el-input v-model="form.sortNo" type="number"></el-input>
         </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="daialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMenu">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
 import axios from 'axios'
  export default {
       name: "SysMenu",
       data() {
           return {
             formInline:"",
             daialogVisible: false, //新增弹框
             form:{

             },
             tableData: [],
            //父级菜单数据
           }
        },
        methods: {
            onSubmit() {
               list();
             },
             //////展示弹框///////////
            list(){
               //从vuex中的state中取出token,放在header
               let token = this.$store.state.currentUser.token;
               let url = 'http://localhost:8090/sys/permission/treeList';
               axios.get(url, {headers: { 'Authorization': token}}).then(resp => {
                   if (resp) {
                      this.tableData = resp.data;
                   }
               });
              },
          // permissionTree(){  ////不好弄，没有现成的select+tree组件
          //    //从vuex中的state中取出token,放在header
          //    let token = this.$store.state.currentUser.token;
          //    let url = 'http://localhost:8090/sys/permission/permissionTree';
          //    axios.get(url, {headers: { 'Authorization': token}}).then(resp => {
          //        if (resp) {
          //           this.options = resp.data;
          //        }
          //    });
          //   },
             //格式化按钮类型 菜单类型(0:一级菜单; 1:子菜单:2:按钮权限)
              menuTypeFormatter(row, column) {
                let menuType = row.menuType;
                if(menuType === 0|| menuType===1){
                  return '菜单'
                } else if(menuType === 2){
                  return '按钮'
                }else{
                  return "未知类型"
               }
              },
              handleClose(){
                this.daialogVisible = false;
              },
              clickAddMenu(){

              },
              addChildMenu(index,row){
                this.form.parentName = row.name;
                this.form.parentId = row.id;
                if(row.menuType==1){
                    this.form.menuType = 2;
                }else if(row.menuType ==2){
                    this.form.menuType = 3;
                }
                this.daialogVisible = true;
              },
              showOpt(index,row){
                if(row.menuType != 2){
                  return true;
                }
                return false;
              },
            ////////保存授权//////
              saveMenu(){
                let token = this.$store.state.currentUser.token;
                let url = 'http://localhost:8090/sys/permission/add';
                axios.post(url,
                this.form,
                {headers: { 'Authorization': token}}
                ).then(resp => {
                    if (resp) {
                      //关闭弹框
                      this.daialogVisible = false;
                    }
                });

              }/////////保存结束////////
        },
       mounted() { //页面加载显示
         this.list();

       }

   }
</script>

<style>
</style>
