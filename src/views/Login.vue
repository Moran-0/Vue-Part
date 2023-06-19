<template>

  <div class="login_container">


    <div class="login_box">
      <div style="margin:20px 0; text-align:center; font-size:24px;color: #2b4b6b;"><b>存知己行李寄存管理平台</b></div>
      <!-- 用户名-->

      <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="login">
        <el-form-item prop="customerId">
          <el-input size="medium" style="margin:10px 0px; width: 300px;margin-left:40px" v-model="form.customerId" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!-- 密码-->
        <el-form-item prop="password">
          <el-input size="medium" style="margin:10px 0px; width: 300px;margin-left:40px" show-password v-model="form.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>

        <div style="margin:10px 0; text-align:center">
            <el-button type="primary" size="small"  @click="login" style="width:26%" v-loading="loading"> 用户登录  </el-button>
          <el-button type="success" size="small" @click="register" style="width:26%">  账号注册  </el-button>
        </div>

        <div style="margin-top: 3px; text-align:center ">
          <el-button @click="jumpUser()" type="primary" plain style="width: 100%;margin-top:10px;margin-bottom:20px;">前往管理员端</el-button>
        </div>


      </el-form>
      </div>

  </div>

</template>

<script>


export default {
  name: "Login",

  data() {
    return {
      form: {
        customerId: '',
        password: ''
      },
      //加载动画
      loading: false,
      //登录按钮文字
      title: '登录',
      rules: { //校验规则
        customerId: [{
          required: true, //表示必填
          message: '请输入手机号',
          trigger: 'blur' //表示焦点离开
        },
          {
            min: 11,
            max: 11,
            message: '请输入正确长度的手机号',
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods:{

    login: function() {

      this.$refs['form'].validate((valid) => {
        if (valid) { //表单校验
          this.loading = true;
          this.title = "登录中...";
          //点击登录后发送请求
          this.request.post("/customerLogin",this.form).then(res => { //登录成功时
            if (res.code == 1) {
              // this.$store.commit('token', res.data.msg) //保存token
              // this.$store.commit('loginCustomerId', res.data.obj
              //     .loginCustomerId); //保存客户id方便查询订单
              // this.$store.commit('loginCustomerName', res.data.obj
              //     .loginCustomerName) //把登录人的名字保存起来到主页显示
              localStorage.setItem("manager",JSON.stringify(res.data));//存储用户信息到浏览器
              this.$router.push('/CustomerHome') //跳转到主页
            } else {
              this.title = "登录";
              this.$message.error(res.msg); //el提示错误消息,用后台返回的msg
            }
            this.loading = false;

          }).catch(err => { //登录失败时
            this.loading = false;
            this.title = "登录";
            console.info(err)

          });
        }

      });

    },
    menu(commentName){
      this.$router.push(commentName);
    },
    register() {
      this.$router.push("/register");
    },
    jumpUser() {
      this.$router.push("/AdminLogin");
    }


  }
}
</script>

<style scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.loginTitle {
  width: 100%;
  font-size: 40px;
  margin: 150px 0px 30px;
  color: white;
  text-align: center;
}
.login_box{
  width: 380px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%,-50%)
}



</style>
