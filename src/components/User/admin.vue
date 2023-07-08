<template>
  <div>

    <div style="padding:10px">
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入账号搜索" v-model="managerId"></el-input>
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入门店搜索"v-model="shopId"></el-input>
      <el-button style="margin-left:30px" type="primary" @click="load">搜 索</el-button>
      <el-button style="margin-left:30px" type="warning" @click="reset">重 置</el-button>
    </div>


    <div style="margin:10px">
      <el-button type="primary" style="margin-left:40px " @click="handleAdd">新 增  <i class="el-icon-circle-plus"></i></el-button>
    </div>


    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="userId" label="员工账号" align="center"  width="150">
      </el-table-column>
      <el-table-column prop="userName" label="员工姓名" align="center" width="170">
      </el-table-column>

      <el-table-column prop="shopId" label="所属门店号" align="center" width="130">
      </el-table-column>

      <el-table-column prop="status" label="员工状态"align="center"  width="150">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="change(scope.row)" active-value="0"
                     inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="password" label="员工密码" align="center" width="270">
    </el-table-column>
      <el-table-column prop="createTime" label="注册时间" align="center" width="290">
      </el-table-column>


      <el-table-column fixed="right" label="操作" text-align:center width="200">

        <template slot-scope="scope">
          <el-button type="success" size="medium" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="管理员信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small" :model="form" :rules="rules" ref="form">
        <el-form-item label="账号" prop="userId">
          <el-input v-model="form.userId"  autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="门店号" prop="shopId">
          <el-input v-model="form.shopId"type="number" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordC">
          <el-input v-model="form.passwordC" type="password" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'Client',
  data(){
    return {
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:5,
      managerId:"",
      shopId:"",
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],
      rules:{
        userId:[{required:true,message:"不能为空"}],
        userName:[{required:true,message:"不能为空"}],
        shopId:[{required:true,message:"不能为空"}],
        password:[{required:true,message:"不能为空",minlength:10}],
        passwordC:[{required:true,message:"不能为空"}],
      },
    }
  },
  created(){
    //请求分页查询数据
      this.load();
  },
  methods: {

    handleEdit(row){
      console.log(row);
      this.form=row;//把当前行的数据赋值给form
      this.dialogFormVisible=true;
    },
    //将请求数据封装为一个方法
    load() {
      this.request.get("/managers",{
        params: {userId:this.managerId,shopId:this.shopId}
      }).then((res)=>{
        console.log(res.data);
        this.tableData=res.data
      }),(error)=>{
        console.log(error);
      }
    },
    reset(){
      this.managerId = "";
      this.shopId = "";
      this.load();
    },
    onSubmit() {
      let code = this.checkForm();
      switch (code) {
        case 666:this.insert();break;
        case 0:this.$message.error('请完善表单相关信息！');break;
        case 1:this.$message.error("密码长度必须大于6！");break;
        case 2:this.$message.error("前后密码不一致！");break;
      }
    },
    // 表单校验
    checkForm(){
      // 1.校验必填项
      let validForm = false;
      let test = false;
      this.$refs.form.validate(valid => {validForm = valid});
      if(!validForm) return 0;
      //其他的校验
      if(this.form.password.length < 6) return 1;
      if(this.form.password!=this.form.passwordC) return 2;
      return 666;
    },

    handleAdd(){
      this.dialogFormVisible = true;
      this.form={};//如果之前有填过值，可以置空
    },
    insert(){
      this.request.post("/managers",this.form).then(res=>{
        if(res.code == 1){
          this.$message.success("添加成功");
          this.dialogFormVisible=false;
          this.load();
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    handleDelete(id){
      this.request.get("/customer"+id+"").then(res=>{
        if(res){
          this.$message.success("删除成功");
          this.load();
        }else{
          this.$message.error("删除失败");
        }
      })
    },
    handleSelectionChange(val){
      console.log(val);
      this.multipleSelection =val;
    },

  }

}
</script>
