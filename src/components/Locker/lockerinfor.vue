<template>
  <div>

    <div style="padding:10px">
      <el-input style="width:200px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入类型搜索" v-model="type"></el-input>
      <el-input style="width:200px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入容量搜索"v-model="capacity" type="number"></el-input>
      <el-button style="margin-left:30px" type="primary" @click="load">搜 索</el-button>
      <el-button style="margin-left:30px" type="warning" @click="reset">重 置</el-button>
    </div>


<!--    <div style="margin:10px">-->
<!--      <el-button type="primary" style="margin-left:40px " @click="hanleAdd">新 增  <i class="el-icon-circle-plus"></i></el-button>-->
<!--    </div>-->



    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="70">
      </el-table-column>
      <el-table-column prop="modelId" label="型号ID" align="center"  width="130">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center" width="110">
      </el-table-column>
      <el-table-column prop="shopId" label="长度" align="center" width="110">
      </el-table-column>
      <el-table-column prop="capacity" label="容量" align="center" width="110">
      </el-table-column>
      <el-table-column prop="length" label="长度" align="center" width="110">
      </el-table-column>
      <el-table-column prop="width" label="宽度" align="center" width="110">
      </el-table-column>
      <el-table-column prop="high" label="高度" align="center" width="110">
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="150">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="120">
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="280">

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

            <el-button type="danger" size="medium" slot="reference" icon="el-icon-delete" >删 除</el-button>
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

    <el-dialog title="寄存柜信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="型号ID">
          <el-input v-model="form.modelId"  autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"  autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="容量">
          <el-input v-model="form.capacity" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="长度">
          <el-input v-model="form.length" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="宽度">
          <el-input v-model="form.width" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="高度">
          <el-input v-model="form.high" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" autocomplete="off" style="width:85%" prefix-icon="el-icon-user"></el-input>
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
  name: 'LockerInfor',
  data(){
    return {
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:10,
      type:"",
      capacity:"",
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],
    }
  },
  created(){
    //请求分页查询数据
     this.load();
  },
  methods: {
    //将请求数据封装为一个方法
    load() {
      this.request.get("/lockers",{
        params:{
          page:this.pageNum,pageSize:this.pageSize,type:this.type,capacity:this.capacity}}).then((res)=>{
        // alert("hello");
        console.log(res.data);
        this.tableData=res.data.rows
        this.total =res.data.total
      }),(error)=>{
        console.log(error);
      }
    },
    handleEdit(row){
      console.log(row);
      this.form=row;//把当前行的数据赋值给form
      this.dialogFormVisible=true;
    },

    //将请求数据封装为一个方法
    hanleAdd(){
      this.dialogFormVisible = true;
      this.form={};//如果之前有填过值，可以置空
    },
    insert(){
      this.form.password="123456"
      this.request.post("/user",this.form).then(res=>{
        if(res){
          this.$message.success("保存成功");
          this.dialogFormVisible=false;
          this.load();
        }else{
          this.$message.error("保存失败");
        }
      })
    },
    handleDelete(id){
      this.request.delete("http://localhost:8084/user/"+id+"").then(res=>{
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
    reset(){
      this.type="";
      this.capacity="";
      this.load();
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
  }

}
</script>
