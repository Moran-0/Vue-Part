<template>
  <div>

    <!--    <div style="margin:10px">-->
    <!--      <el-button type="danger" style="margin-left:40px " @click="delBatch">删 除<i class="el-icon-remove"></i></el-button>-->
    <!--     -->
    <!--    </div>-->

    <div style="padding:10px">
      <el-input style="width:250px ;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入订单号搜索" v-model="orderId"></el-input>
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入客户账号搜索"v-model="customerId"></el-input>

      <el-button style="margin-left:30px" type="primary" @click="search">搜 索</el-button>
      <el-button style="margin-left:30px" type="warning" @click="reset">重 置</el-button>
    </div>

      <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="orderId" label="订单号 " align="center" width="80">
      </el-table-column>
      <el-table-column prop="customerId" label="客户账号 " align="center" width="170">
      </el-table-column>
      <el-table-column prop="lockerId" label="寄存柜ID " align="center"  width="90">
      </el-table-column>
      <el-table-column prop="shopId" label="门店ID" align="center" width="90">
      </el-table-column>
      <el-table-column prop="fromTime" label="开始时间" align="center" width="230">
      </el-table-column>
      <el-table-column prop="toTime" label="结束时间" align="center" width="230">
      </el-table-column>
      <el-table-column prop="payTotal" label="金额" align="center" width="100">
      </el-table-column>
      <el-table-column prop="orderTime" label="订单时间" align="center" width="220">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">


        <template slot-scope="scope">
<!--          <el-button type="success" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>-->
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




  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'LeaseOrder',
  data(){
    return {
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:10,
      orderId:"",
      customerId:"",
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
      this.request.get("/orders",{
        params: {page:this.pageNum,pageSize:this.pageSize,orderId:this.orderId,customerId: this.customerId}
      }).then((res)=>{
        console.log(res.data);
        this.tableData=res.data.rows
        this.total = res.data.total
      }),(error)=>{
        console.log(error);
      }
    },
    search(){
      const phone= /^1\d{10}$/    //以1开头的数字
      if (this.customerId !="" && !(phone.test(this.customerId))) {
        this.$message.error("账号格式错误");
      }else{
        this.load();
      }
    },
    reset(){
      this.orderId="";
      this.customerId="";
      this.load();
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

  }

}
</script>
