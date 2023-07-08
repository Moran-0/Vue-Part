<template>
  <div>

    <div style="padding:10px">
      <el-input style="width:250px ;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入名称搜索" v-model="name"></el-input>
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入账号搜索"v-model="usercode"></el-input>

      <el-button style="margin-left:30px" type="primary" @click="search">搜 索</el-button>
      <el-button style="margin-left:30px" type="warning" @click="reset">重 置</el-button>
    </div>


    <div style="margin:10px">
      <el-button type="danger" style="margin-left:40px " @click="delBatch">删 除  <i class="el-icon-remove"></i></el-button>
    </div>


    <el-table :data="tableData" row-key="id" cell-style="rowStyle"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="100">
      </el-table-column>
      <el-table-column prop="customerId" label="客户账号 " align="center"r width="230">
      </el-table-column>
      <el-table-column prop="name" label="客户名称 " align="center"  width="170">
      </el-table-column>
      <el-table-column prop="password" label="客户密码" align="center" width="230">
      </el-table-column>

      <el-table-column prop="createTime" label="注册时间" align="center" width="240">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="300">


        <template slot-scope="scope">
          <el-button type="success" size="medium" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm style="margin-left:5px"
                         confirm-button-text='确定'
                         cancel-button-text='再想想'
                         icon="el-icon-info"
                         icon-color="red"
                         title="您确定删除吗？"
                         @confirm="handleDelete(scope.row.id)"
          >

            <el-button type="danger" size="medium" slot="reference" icon="el-icon-delete" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding:10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>


    <el-dialog title="客户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.customerId" key="domain.key"autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.customerName" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
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
      roles:[],
      total:0,
      pageNum:1,
      pageSize:10,
      name:"",
      usercode:"",
      dialogFormVisible:false,
      form:{},
      multipleSelection:[]
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
    handleSizeChange(val) {/*传递过来当前是第几页*/
      console.log(`每页 ${val} 条`);
      this.pageSize=val;  //获取当前每页显示条数
      this.load();
    },
    handleCurrentChange(val) {/*传递过来当前是第几页*/
      console.log(`当前页: ${val}`);
      this.pageNum=val;   //获取当前第几页
      this.load();
    },
    //将请求数据封装为一个方法
    load() {
      this.request.get("/customer",{
        params:{
          page:this.pageNum,pageSize:this.pageSize,customerName:this.name,customerId:this.usercode}}).then((res)=>{
       // alert("hello");
       console.log(res.data);
        this.tableData=res.data.rows
        this.total =res.data.total
      }),(error)=>{
        console.log(error);
      }
    },
    search(){
      const phone= /^1\d{10}$/    //以1开头的数字
      if (this.usercode !="" && !(phone.test(this.usercode))) {
        this.$message.error("账号格式错误");
      }else{
        this.load();
      }
    },
    delBatch(){
      let ids=this.multipleSelection.map(v=>v.id);//map这个方法可以实现将multipleSelection中的对象扁平化处理。
      console.log(ids);
      let url = "/customer/"+ids[0]
      for (let i in (1,5)){
        url += ","
        url+= ids[i]
      }
      console.log(url)
      if (ids.length!=0){
        this.request.get(url).then(res=>{
          if(res){
            this.$message.success("批量删除成功");
            this.load();
          }else{
            this.$message.error("批量删除失败");
          }
        })
      }else alert("请选择要删除的用户！")
    },
    reset(){
      this.name="";
      this.usercode="";
      this.load();
    },
    rowStyle(){
      return "text-align:center"
    },

    handleDelete(id){
      let url = "/customer/"+id+""
      this.request.get(url).then(res=>{
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
