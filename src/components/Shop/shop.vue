<template>
  <div>


    <div style="padding:10px">
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入名称搜索" v-model="name"></el-input>
      <el-input style="width:250px;margin-left:40px " suffix-icon="el-icon-search" placeholder="请输入省份搜索"v-model="province"></el-input>
      <el-button style="margin-left:30px" type="primary" @click="load">搜 索</el-button>
      <el-button style="margin-left:30px" type="warning" @click="reset">重 置</el-button>
    </div>


    <div style="margin:10px">
      <el-button type="primary" style="margin-left:40px " @click="hanleAdd">新 增 <i class="el-icon-circle-plus"></i></el-button>

    </div>


    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>


      <el-table-column prop="id" label="门店ID" text-align:center  width="170">
      </el-table-column>
      <el-table-column prop="name" label="门店名称" text-align:center width="170">
      </el-table-column>
      <el-table-column prop="province" label="省" text-align:center  width="170">
      </el-table-column>
      <el-table-column prop="city" label="市" text-align:center  width="170">
      </el-table-column>
      <el-table-column prop="district" label="区" text-align:center  width="170">
      </el-table-column>
      <el-table-column prop="address" label="地址" text-align:center width="170">
      </el-table-column>

      <el-table-column prop="tel" label="联系电话" text-align:center width="210">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="change(scope.row)" active-value="1"
                     inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="owner" label="负责人" text-align:center width="210">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" text-align:center width="210">
      </el-table-column>

      <el-table-column fixed="right" label="操作" text-align:center width="200">

        <template slot-scope="scope">
          <el-button type="success" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="新增门店信息" :visible.sync="dialogFormVisible" width="30%">

      <el-form label-width="80px"  size="small" :model="form" :rules="rules" ref="form">
        <div id="app" >
          <el-cascader
              size="middle"
              :options="options"
              style="width: 100%"
              v-model="selectedOptions"
              placeholder="请选择地区"
              @change="addressChange">
          </el-cascader>
        </div>

        <div style="padding:10px">
          <el-form-item label="门店名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:85% " ></el-input>
        </el-form-item>
        <el-form-item label="具体地点" prop="address">
          <el-input v-model="form.address" autocomplete="off" style="width:85% " ></el-input>
        </el-form-item>
          <el-form-item label="负责人ID" prop="ownerId">
            <el-input v-model="form.ownerId" autocomplete="off" style="width:85% " ></el-input>
          </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="form.tel" autocomplete="off" style="width:85%" ></el-input>
        </el-form-item>
          </div>

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
import { regionData, codeToText } from 'element-china-area-data'
export default {
  name: 'Shop',
  data(){
    return {
      options: regionData,
      selectedOptions: [],
      tableData:[],
      name:"",
      province:"",
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],
      rules:{
        name:[{required:true,message:"不能为空"}],
        address:[{required:true,message:"不能为空"}],
        ownerId:[{required:true,message:"不能为空"}],
        tel:[{required:true,message:"不能为空"}],

      }
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
      this.request.get("/shop",{
        params:{name:this.name,province:this.province}
      }).then((res)=>{
        console.log(res.data);
        this.tableData=res.data
      }),(error)=>{
        console.log(error);
      }
    },

    reset(){
      this.name="";
      this.province="";
      this.load();
    },

    hanleAdd(){
      this.dialogFormVisible = true;
      this.form={};//如果之前有填过值，可以置空
    },
    insert(){
      this.request.post("/addShop",this.form).then(res=>{
        if(res.code==1){
          this.$message.success("添加成功");
          this.dialogFormVisible=false;
          this.load();
        }else{
          this.$message.error("添加失败\n"+res.msg);
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

    addressChange(arr) {
      console.log(arr);
      console.log(codeToText[arr[0]], codeToText[arr[1]], codeToText[arr[2]]);
      this.form.province = codeToText[arr[0]];
      this.form.city = codeToText[arr[1]];
      this.form.district = codeToText[arr[2]];
    },

    onSubmit(){
      let isRight = true;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          isRight = false;
        }
      });
      if (!isRight) {
        this.$message.error('请完善表单相关信息！');
        return;
      }
      const phone= /^1\d{10}$/    //以1开头的数字
      if (this.form.tel !="" && !(phone.test(this.form.tel))) {
        this.$message.error("电话格式错误");
      }else{
        console.log(this.form);
        this.insert();
      }
    },


  }

}
</script>

