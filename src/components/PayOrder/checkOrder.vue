<template>
  <div>
    <div>

<!--      <el-descriptions   title="寄存柜详情"  direction="vertical" style="width: 60%; margin:10px auto auto;" :colon="false" labelClassName="despLable" >-->

<!--        <el-descriptions-item>-->
<!--          <template slot="label">-->
<!--          <i class="el-icon-box"></i>-->
<!--            寄存柜类型-->
<!--        </template>{{finalForm.lockerClass}}-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item>-->
<!--          <template slot="label">-->
<!--            <i class="el-icon-info"></i>-->
<!--            详细信息-->
<!--          </template>{{lockerInfo.length}}长／{{lockerInfo.width}}宽／{{lockerInfo.height}}高  &lt;!&ndash; 可删&ndash;&gt;-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item>-->
<!--          <template slot="label">-->
<!--            <i class="el-icon-bank-card"></i>-->
<!--            价格-->
<!--          </template>{{lockerInfo.price}}元/天-->
<!--        </el-descriptions-item>-->
<!--      </el-descriptions>-->

      <!-- 账单详情 -->

      <el-descriptions title="门店&订单"  style="width: 60%; margin: auto;" border :column="1" >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-shop"></i>
            门店
          </template>{{details.province}}{{details.city}}{{details.district}}{{details.shop}} <br/>
          {{finalForm.fromTime.toLocaleString()}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-information"></i>
            详细地址
          </template>{{details.address}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-service"></i>
            负责人
          </template>{{details.clerk}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-phone-outline"></i>
            联系方式
          </template>{{details.tel}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-unlock"></i>
            存件时间
          </template>{{finalForm.fromTime}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-lock"></i>
            取件时间
          </template>{{finalForm.toTime}}
        </el-descriptions-item>

        <el-descriptions-item label="合计金额">
          <template slot="label">
            <i class="el-icon-bank-card"></i>
            订单总额
          </template>{{details.total}}元
        </el-descriptions-item>//可能需要后端负责计算总金额

      </el-descriptions>

    </div>
  </div>
</template>

<script>
export default {
  name: "checkOrder",
  data() {
    return {
      finalForm: {

      },
      details: {
        province: "",
        city: "",
        district: "",
        address: "",
        tel:"",
        clerk:"",
        total: "",
      },
      lockerInfo:{
        length:"",
        width:"",
        height:"",
        price:""
      },
    } //data return end
  },
  created() {
    //获取表单
    this.finalForm = Object.assign({}, this.homeForm);
    console.log("获取表单");
    console.log(this.homeForm);
    let shops = JSON.parse(localStorage.getItem("shops"))[0];
    console.log(shops);
    //获取订单详情提交表单
    this.getDetailForm = Object.assign({}, this.finalForm);
    this.getLockerInfo = Object.assign({}, this.lockerInfo);
    //修改日期格式
    this.getDetailForm.fromTime = this.getDetailForm.fromTime.toLocaleString().replaceAll("/", "-");
    this.getDetailForm.toTime = this.getDetailForm.toTime.toLocaleString().replaceAll("/", "-");
    this.details.province = shops.province;
    this.details.city = shops.city;
    this.details.district = shops.district;
    this.details.tel = shops.tel;
    this.details.clerk = shops.owner;
    this.details.total = 100;
    this.details.address = shops.address;
    //查询门店详细信息
    // this.request.post("").then(res => {
    //   if (res.data.success) {
    //     this.details = Object.assign({}, res.data.obj);
    //   }else{
    //     this.$notify.error({
    //       title: '获取订单详情失败',
    //       message: res.data.msg
    //     });
    //   }
    // }).catch(err => {
    //   console.error(err);
    // })
    //查询寄存柜详细信息
  //   this.$axios({
  //     method: "post",
  //     url: "api/customer/checkOrder",//待修改
  //     data: this.getLockerInfo
  //   }).then(res => {
  //     if (res.data.success) {
  //       this.lockerInfo = Object.assign({}, res.data.obj);
  //     }else{
  //       this.$notify.error({
  //         title: '获取订单详情失败',
  //         message: res.data.msg
  //       });
  //     }
  //   }).catch(err => {
  //     console.error(err);
  //   })
  },

  methods: {
    submitForm() {

    },
    sendToParent() {
      this.$emit('sendback', this.finalForm);
    }

  }, //methods end
  props: ['homeForm', 'lockerInfo'],
  computed: {
    token() {
      // return this.$store.state.token;
    }
  }
} //export end
</script>

<style>

.my-label{
  background: #E1F3D8;
}
</style>
