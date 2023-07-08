<template>

  <el-dropdown style="width:150px; cursor:pointer">
    <span>{{this.names}}</span><i class="el-icon-arrow-down"  style="margin-left:5px"></i>
    <el-dropdown-menu slot="dropdown">
<!--      <el-dropdown-item @click="menu('/client')">个人信息</el-dropdown-item>-->
      <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
     </el-dropdown-menu>

  </el-dropdown>

</template>
<script>
export default {
  name: "Header",
  props: {
    name: String
  },
  data(){
    return{
      names:"欢迎登录,"+JSON.parse(localStorage.getItem("manager"))[0].userName
    }
  },
  methods:{
    logout(){
      alert("安全退出系统");
      console.log('/AdminLogin');
      this.$router.push('/AdminLogin');
    },

    menu() {
      this.$router.push("/AdminLogin");
    }
  }
}
</script>

<style>

</style>
