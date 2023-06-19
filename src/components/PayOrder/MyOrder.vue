<template>
  <div id="base">

    <div class="clearfix">
<!--      <el-button type="text"><b style="font-size: 18px;">{{ loginCustomerName }}</b></el-button>-->
<!--      <span style="font-size: 18px;color: #017cff">{{ loginCustomerName }}</span>-->
<!--      <span style="font-size: 18px;color: #017cff">[</span>-->
<!--      <el-button type="text" @click="checkOut"><b style="font-size: 18px;">退出</b></el-button>-->
<!--      <span style="font-size: 18px;color: #017cff">]</span>-->


      <el-button icon="el-icon-arrow-left" type="primary" class="right" @click="toHome()"><b style="font-size: 18px;"><i class="el-icon-s-home"></i></b></el-button>
    </div>
    <el-divider></el-divider>
    <span class="table-title" style="font-size: 18px"><i class="el-icon-s-order">|订单列表</i></span>
    <el-divider></el-divider>

    <el-table :data="tableData1" style="width: 100%" :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}">
      <el-table-column prop="id"  label="订单号" width="100px">
      </el-table-column>
      <el-table-column prop="province" label="省" width="100px">
      </el-table-column>
      <el-table-column prop="city" label="市" width="100px">
      </el-table-column>
      <el-table-column prop="district" label="区" width="100px">
      </el-table-column>
      <el-table-column prop="shopName" label="店名" width="100px">
      </el-table-column>
      <el-table-column prop="address" label="详细地址" width="100px">
      </el-table-column>
      <el-table-column prop="clerk" label="负责人" width="100px">
      </el-table-column>
      <el-table-column prop="tel" label="联系方式" width="100px">
      </el-table-column>
      <el-table-column prop="fromTime"  label="存件时间" width="100px">
      </el-table-column>
      <el-table-column prop="toTime" label="取件时间" width="100px">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100px">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="100px">
      </el-table-column>

    </el-table>

<!--    <div class="block">-->
<!--      <el-pagination v-show="total > 0" background @size-change="query" @current-change="query"-->
<!--                     :current-page.sync="queryForm.pageNum" :page-size.sync="queryForm.pageSize"-->
<!--                     layout="total,sizes,prev, pager, next,jumper" :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->

  </div>
</template>

<script>
export default {
  name:'MyOrder',
  data() {
    return {
      // queryForm: {
      //   customerId: this.$store.state.loginCustomerId,
      //   pageNum: 1,
      //   pageSize: 10,
      // },

      total: 0,
      tableData: [],
      tableData1: [{
        id: '1',
        province: '黑龙江省',
        city: '哈尔滨市',
        district: '道外区',
        shopName:'哈尔滨站西广场店',
        address: '距哈尔滨站地铁3号口30米',
        clerk:"dizjia",
        tel:"0746-8888888" ,
        fromTime: '2023-6-15 18:05:01',
        toTime: '2023-6-16 18:05:01',
        status: '已结束使用',
        orderTime: '2023-6-15 18:05:00'
      }],
    }
  },
  computed: {
    // loginCustomerName() {
    //   return this.$store.state.loginCustomerName //用vuex中保存的值
    // },
    // loginCustomerId() {
    //   return this.$store.state.loginCustomerId //用vuex中保存的值
    // }
  },
  methods: {
    toHome() {
      this.$router.push("/CustomerHome");
    },
    query() {
      this.$axios({
        method: 'post',
        url: 'api/lease/order/listByCustomerId',
        data: this.queryForm
      }).then(res => {
        if (res.data.success) {
          this.tableData = res.data.obj.list;
          this.total = res.data.obj.total;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(err => {
        console.info(err)
      });
    },

    checkOut() {
      //请求数据到后台，删除redis中的缓存
      this.$axios({
        method: 'get',
        url: 'api/sys/user/logout'
      }).then(res => {
        if (res.data.success) {
          this.$store.commit('token', '');
          this.$store.commit('loginUserName', '');
          this.$store.commit('loginCustomerName', '');
          this.$store.commit('loginCustomerId', '');
          this.$store.commit('menuIndex', '');
          this.$store.commit('breadcrumbTitle', '');
          this.$store.commit('breadcrumbIndex', '');
          this.$store.commit('headImgUrl', '');
          this.$router.push('/Customer/Login');
        } else {
          this.$notify({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        console.log(err)
      })
    },

  },

  created() {
    //初始化页面时进行数据查询,生命周期中的钩子函数
    this.query();
  }
}
</script>

<style>
#base {
  padding: 20px 250px;
}
.right{
  background: #409EFF;
}
</style>
