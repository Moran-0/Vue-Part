<template>
  <div id="cushome">
    <el-container style="width: 75%; margin: auto; height: 100%;">
      <el-header>
<!--         跳转到客户登录页面,另外指定路径，不要使用管理后台登录页面-->
        <el-button v-if="loginCustomerName === '' && loginCustomerId === ''" type="text" @click="toLogin">登陆/注册
        </el-button>
        <el-dropdown v-else @command="handleDropdown" style="float: left; margin-left:15px;margin-top: 30px">
          <div>
            <i class="el-icon-user"
               style="font-size: 30px;font-weight: 800;">{{loginCustomerName !==''?loginCustomerName:loginCustomerId}}</i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="orderList">全部订单</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
      <el-main style="height: 80%;">
        <!-- 顶部订单状态栏-->
        <div style="align-self: center;">
          <el-steps :active="currentStep" simple  finish-status="success" style="margin-top: 10px">
            <el-step title="下单" icon="el-icon-edit"></el-step>
            <el-step title="查看订单" icon="el-icon-view"></el-step>
          </el-steps>
        </div>
        <!-- 考虑到表单内容不适合作为全局变量，父子路由方法被废弃 -->
        <!-- <router-view></router-view> -->
        <!-- 每一个步骤的方法，使用动态组件-->
        <component :is="currentTab" v-bind="orderForm" @sendback="setFromChild" :homeForm="orderForm" :lockerInfo="lockerInfo"
                   @sendNote="getNoteFromChild"></component>

        <!-- 提交和下一页，这部分内容可能需要固定列宽的表格限制一下 -->
        <el-button-group style="float: right;" class="btn">
          <el-button type="info" icon="el-icon-arrow-left" @click="prevPage" v-show="buttonValid.prev"
                     :disabled="buttonValid.prevDisable">返回</el-button>
          <el-button type="primary" @click="nextPage" v-show="buttonValid.next" :disabled="buttonValid.nextDisable">
            前往确认<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button type="success" v-show="buttonValid.submit" @click="open">提交<i
              class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </el-main>


    </el-container>
  </div>
</template>

<script>
import stepOne from "@/components/PayOrder/Ordering.vue"
import stepTwo from "@/components/PayOrder/checkOrder.vue"

export default {
  name: "CustomerHome",
  data() {
    return {
      //当前订单步骤
      currentStep: 0,
      //页面底部按钮控制
      buttonValid: {
        submit: false,
        next: true,
        prev: false,
        prevDisable: false,
        nextDisable: false
      },
      //当前选择的车辆详情信息
      lockerInfo: {

      },
      //提交和子组件交流公用的 订单信息表
      orderForm: {
        lockerClass: "",
        customerId: "",
        fromShopId: "",
        fromTime: "",
        toTime: "",
        status: "未支付", //未支付、已支付
        type: "微信",
        payTime: "",
        orderTime: "", //可能要交由后端完成
        fromDistrict: "", //不提交，用于步骤2恢复数据
      },
      // payImgUrl: require("@/assets/payment.png")
    } //data return end
  },
  //进入主页
  created() {
    //从全局变量获取登录信息；注意：如果客户端登录保存方式和管理后台不同，则需要更改
  },
  //自动计算
  computed: {
    //根据当前的步骤，设定当前的组件
    currentTab() {
      let tabs = [stepOne, stepTwo]
      return tabs[this.currentStep];
    },
    userToken() {
      return this.$store.state.token;
    },
    // loginCustomerId() {
    //   return this.$store.state.loginCustomerId;
    // },
    // loginCustomerName() {
    //   return this.$store.state.loginCustomerName;
    // }
  },
  //包含的子组件
  components: {
    stepOne: stepOne,
    stepTwo: stepTwo
  },
  methods: {
    //翻到上一页
    prevPage() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.buttonValid.next = true;
        this.buttonValid.submit = false;
      }
      if (this.currentStep <= 0) {
        this.buttonValid.prev = false;
        this.currentStep = 0;
      }
    },
    //翻到下一页
    nextPage() {
      // if (this.currentStep == 1){
      //   console.log("表单校验", this.$refs['shopForm'].validate());
      // }
      if (this.currentStep < 1) {
        this.currentStep++;
        this.buttonValid.prev = true;
        this.buttonValid.submit = true;
      }
      if (this.currentStep >= 1) {
        this.buttonValid.next = false;
        this.currentStep = 1;
        this.buttonValid.submit = true;
      }
    },
    //提交订单（已支付的提交）将提交给服务器
    submitOrder() {
      console.info("提交按钮被点击了>_<");
      let submitForm = Object.assign({}, this.orderForm);
      //转换表单中的日期格式
      submitForm.fromTime = submitForm.fromTime.toLocaleString().replaceAll("/", "-");
      submitForm.toTime = submitForm.toTime.toLocaleString().replaceAll("/", "-");

      this.$axios({
        method: "POST",
        url: "api/lease/order/makeDeal",
        data: submitForm
      }).then(res => {
        if (res.data.success) {
          this.$notify.success({
            title: '提交成功',
            message: res.data.msg
          });
          this.$router.push('/customer/CustomerOrder');
        } else {
          //弹出错误提示
          this.$notify.error({
            title: '提交失败',
            message: res.data.msg
          });
          if (msg.indexOf("登录") != -1) {
            console.log("用户未登录");
            this.$router.push("/Customer/Login");
          }
        }
      }).catch(err => {
        console.error(err);
      })
    }, //submitOrder end
    //获得来自子组件的信息
    setFromChild(dataForm, lockerForm = null) {
      this.orderForm = Object.assign({}, dataForm);
      if (lockerForm != null) {
        this.lockerInfo = lockerForm;
      }
      console.log("用户订购选择已保存");
    },
    //子组件发来的提示消息由此方法处理
    getNoteFromChild(type, msg) {
      //回传的信息有请确认，则停留在该页面
      if (msg.indexOf("请确认") != -1 && this.currentStep == 1) {
        //不清楚，反正有timeout之后可以运行了
        setTimeout(() => {
          this.$notify({
            title: '提示',
            message: msg,
            type: type
          });
        }, 300);

        this.prevPage(); //临时关闭表单填写校验
        //禁用下一步按钮3秒
        this.buttonValid.nextDisable = true;
        setTimeout(() => {
          this.buttonValid.nextDisable = false;
        }, 1000);
      }

    },
    //打开、渲染支付对话框
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: '支付',
        message: h('p', null, [
          h('span', null, '请使用微信支付'),
          h('img', {
            attrs: {
              src: this.payImgUrl
            }
          }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.submitOrder();
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 2000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$router.push('/MyOrder')
      });
    },
    //前往登录页面
    toLogin() {
      this.$router.push('/Customer/Login'); //待修改
    },
    //
    handleDropdown(command) {
      console.log(command);
      if (command == "orderList") {
        this.$router.push('/MyOrder');
      }
      if (command == "logout") {
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
            this.$router.push('/Customer/Login');//待修改
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
      }
    }
  } //method end
}
</script>

<style>
#cushome h2 {
  color: #66b1ff;
}

.despLable {
  text-align: center;

  background: #d9ecff;
}

.despCont {
  text-align: center;
  background: #ecf5ff;
}

.selectItems {
  width: 220px;
}

.btn {
  position: fixed;
  bottom: 60px;
  right:250px;
  text-align: center;
  background-color: #fff;
}
</style>
