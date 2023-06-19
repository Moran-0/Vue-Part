<template>

  <div class="login_container">

    <div class="login_box">
      <div style="margin:20px 0; text-align:center; font-size:24px;color: #3A1C71;"><b>存知己行李寄存管理平台</b></div>
      <!-- 用户名-->

      <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="login">
        <el-form-item prop="userId">
          <el-input size="medium" style="width: 300px;margin: 10px 0px 10px 40px;" v-model="form.userId" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!-- 密码-->
        <el-form-item prop="password">
          <el-input size="medium" style="width: 300px;margin: 10px 0px 10px 40px;" show-password v-model="form.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <div style="margin:10px 0; text-align:center">
          <el-button type="primary" size="small" @click="login"  style="width:26%" v-loading="loading">  登 录  </el-button>
        </div>
        <div style="margin-top: 3px; text-align:center">
          <el-button @click="customer" type="primary" plain style="width: 100%;margin-top:10px;margin-bottom:20px;">前往客户端</el-button>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      //绑定form对象
      form: {
        userId: '',
        password: ''
      },
      //加载动画
      loading: false,
      //登录按钮文字
      title: '登录',
      rules: {
        userId: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.title = "登录中...";
          this.request.post("/adminLogin",this.form).then(res => {
            console.log(res)
            if (res.code==1) {
              // this.$store.commit('token', res.msg)
              // // this.$store.commit('loginUserName', res.data.obj.loginUserName)
              // // this.$store.commit('authUrlsList', res.data.obj.authUrlsList)
              // //清除上次登录的缓存
              // this.$store.commit('menuIndex', '');
              // this.$store.commit('breadcrumbTitle', '');
              // this.$store.commit('breadcrumbIndex', '');
              localStorage.setItem("manager",JSON.stringify(res.data));//存储用户信息到浏览器
              this.$router.push('/homepage')
              this.$message.success("登录成功！");
            } else {
              this.title = "登录";
              this.$message.error(res.msg);
            }
            this.loading = false;
          }).catch(err => {
            this.loading = false;
            this.title = "登录";
            console.info(err)
          });
        }
      });
    },
    customer() {
      this.$router.push('/Login');
    }
  }
}
</script>

<style scoped>
.login_container{
  background-color: #3A1C71;
  height: 100%;
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
