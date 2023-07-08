<template>
  <div>

    <div style="padding:10px">

      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入门店搜索"v-model="shopName"></el-input>
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入型号搜索"v-model="modelId" type="number"></el-input>
      <el-button style="margin-left:30px" type="primary" @click="load">搜 索</el-button>
      <el-button style="margin-left:30px" type="warning" @click="reset">重 置</el-button>
    </div>


    <div style="margin:10px">
      <el-button type="primary" style="margin-left:40px " @click="handleAdd">新 增  <i class="el-icon-circle-plus"></i></el-button>
    </div>


    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="modelId" label="型 号 ID" text-align:center  width="200">
      </el-table-column>
      <el-table-column prop="shopId" label="门 店 ID" text-align:center width="200">
      </el-table-column>
      <el-table-column prop="shopName" label="门 店 名 称" text-align:center width="220">
      </el-table-column>
      <el-table-column prop="num" label="数 量" text-align:center width="220">
      </el-table-column>
<!--      <el-table-column prop="state" label="使用状态" text-align:center width="170">-->
<!--      </el-table-column>-->


      <el-table-column fixed="right" label="操 作" text-align:center width="200">

        <template slot-scope="scope">
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


    <el-dialog title="寄存柜添加" :visible.sync="dialogFormVisible" width="26%">
      <el-form label-width="90px" size="small" :model="form" :rules="rules" ref="form">
        <el-form-item label="门店ID" prop="shopId" ref="shopId">
          <el-input v-model="form.shopId" type="number" autocomplete="off" style="width:85%" prefix-icon="el-icon-plus"></el-input>
        </el-form-item>
        <el-form-item label="型号ID"  prop="modelId" ref="modelId">
          <el-input v-model="form.modelId" type="number" autocomplete="off" style="width:85%" prefix-icon="el-icon-plus"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="num" ref="num">
          <el-input v-model="form.num" type="number" autocomplete="off" style="width:85%" prefix-icon="el-icon-plus"></el-input>
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

import {number} from "echarts";

export default {
  name: 'ShopLocker',
  data(){
    return {
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:5,
      shopName:"",
      modelId:"",
      dialogFormVisible:false,
      form:{},
      rules:{
        modelId:[{required:true,message:"不能为空",trigger:"blur"}],
        shopId:[{required:true,message:"不能为空"}],
        num:[{required:true,message:"不能为空"}],
      },
      multipleSelection:[]
    }
  },
  created(){
    //请求分页查询数据
     this.load();
  },
  methods: {

    //将请求数据封装为一个方法
    load() {
      this.request.get("/shopLockers",{
        params: {shopName:this.shopName,modelId:this.modelId}
      }).then((res)=>{
        console.log(res.data);
        this.tableData=res.data
      }),(error)=>{
        console.log(error);
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //调用接口保存
          this.insert();
        } else {
          this.$message.error('请完善表单相关信息！');
          return false;
        }
      });
    },
    reset(){
      this.shopName="";
      this.modelId="";
      this.load();
    },
    handleAdd(){
      this.dialogFormVisible = true;
      this.form={};//如果之前有填过值，可以置空
    },
    insert(){
      this.request.get("/addShopLocker",{
        params:{modelId:this.form.modelId,shopId:this.form.shopId,num:this.form.num}
      }).then(res=>{
        if(res.code==1){
          this.$message.success("添加成功");
          this.dialogFormVisible=false;
          this.load();
        }else{
          this.$message.error("添加失败! "+res.msg);
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
