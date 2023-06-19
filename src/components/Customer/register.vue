<template>
<!--  <el-container style="height: 100%; border: 0px solid #2b4b6b">-->


<!--    <el-main>-->

      <div class="login_container">
        <div id="register">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @keyup.enter.native="submitForm">

            <el-row :gutter="10" style="margin-bottom:90px">
              <div style="margin: 0 0; text-align: center; font-size: 40px; color: #eeeeee;"><b>——————</b></div>
              <div style="margin: 0 0; text-align: center; font-size: 40px; color: #eeeeee;"><b>欢 迎 注 册</b></div>
              <div style="margin: 0 0; text-align: center; font-size: 40px; color: #eeeeee;"><b>——————</b></div>
          </el-row>

          <el-form-item prop="customerId">
            <el-input type="text" v-model="ruleForm.customerId" placeholder="请输入手机号码）" clearable></el-input>
          </el-form-item>

          <el-form-item prop="name">
            <el-input type="text" v-model="ruleForm.name" placeholder="请输入名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认密码" clearable></el-input>
          </el-form-item>

        </el-form>
        <div>
          <el-button @click="submitForm('ruleForm')" type="primary" style="width: 100%;" v-loading="loading">提交
          </el-button><br /><br />
          <el-button @click="jumpCustomerLogin()" type="primary" style="width: 100%;">回到登录</el-button>
        </div>
      </div>
    </div>
<!--    </el-main>-->
<!--  </el-container>-->
</template>

<script>
export default {
  name: 'Register',
  data() {
    //自定义校验规则
    let validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入数据'));
      } else {
        callback();
      }
    };
    let validateRequire11 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (value.length != 11) {
        callback(new Error('手机号长度错误'));
      } else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,

      ruleForm: {
        customerId: '',
        name: '',
        password: '',
        checkPass: '',


      },

      rules: {
        customerId: [{
          validator: validateRequire11,
          trigger: 'blur'
        }],

        name: [{
          validator: validateRequire,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => { //点击提交时进行校验
        if (valid) {
          //提交时的执行代码
          this.request.post("/register",this.ruleForm).then(res => {
            if (res.code==1) {
              //路由跳转
              this.$router.push("/Login");
              this.$notify({ //el消息弹窗通知组件
                title: '成功',
                message: "注册成功，请重新登录",
                type: 'success'
              });
            }  else {
              this.$notify.error({
                title: '错误提示',
                message: "注册失败"
              });
            }
          }).catch(err => {
            console.info(err)
          });

        } else {
          this.$notify.error({
            title: '错误提示',
            message: "数据有误，请先完善数据"
          });
          return false;
        }
      });
    },

    jumpCustomerLogin() {
      this.$router.push("/Login");
    }
  }

}
</script>

<style scoped>
#register {
  width: 260px;
  margin: 0% auto auto;

}
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}


</style>
