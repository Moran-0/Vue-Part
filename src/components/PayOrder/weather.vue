
<template>
  <div id="app" class="wrap">

    <div style="margin:10px">
      <el-button type="primary" style="margin-left:80px" @click="tohomepage">返     回</el-button>
    </div>
<div class="search_form">
  <div class="logo">
 <img src="@/assets/weather_og.png"style="width:400px;position:relative;top:5px;margin-right:130px;margin-top:20px" alt="天气预报">
  </div>
  <div class="txt">
    <input type="text" class="input_txt" @keyup.enter="searchWeather" v-model="city" placeholder="请输入查询的城市">
    <button class="input_sub" @click="searchWeather">搜 索</button>

  </div>
  <div class="hotkey">
    <a href="javascript:;" @click="changeCity('北京')">北京</a>
    <a href="javascript:;" @click="changeCity('上海')">上海</a>
    <a href="javascript:;" @click="changeCity('广州')">广州</a>
    <a href="javascript:;" @click="changeCity('深圳')">深圳</a>
     </div>
</div>
<ul class="weather_list">
  <li v-for="item in weatherList" :key="item.date">
    <div class="info_type">
      {{item.date}}
    </div>
    <div class="info_temp">
      <b>{{item.tem2}}</b>
      ~
      <b>{{item.tem1}}</b>
    </div>
    <div class="info_date">
      {{item.wea}}
    </div>
  </li>
</ul>

</div>
  </template>
<script>

import homepage from "@/components/HomePage/homepage.vue";

export default {
  name: "WeatherApp",
  computed: {
    homepage() {
      return homepage
    }
  },
  data() {
    return {
      city: "",
      weatherList: []
    };
  },


  methods: {
    searchWeather() {
      // const that = this;

      this.request.get("https://ajax-api.itheima.net/api/weather?city="+ this.city,).then((res)=>{
        //this.city=res.data.city;
        console.log(res.data);

       this.weatherList = res.data.data;
       // that.weatherList = res.data.forecast;
      }),(error)=>{
        console.log(error);
      }
    },

    changeCity(city) {
      this.city = city;
      this.searchWeather();
    },
    tohomepage() {
      this.$router.push('/CustomerHome'); //待修改
    },
  }
};
</script>
<style>

.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.search_form {
  width: 650px;
  margin: 20px auto 20px;
}

.logo img {
  display: block;
  margin: 0 auto;
}

.txt {
  margin: 30px auto;
}

.input_txt {
  width: 540px;
  height: 40px;
  border: 1px solid #41a1cb;
  text-indent: 10px;
}

.input_sub {
  width: 104px;
  height: 44px;
  float: right;
  font-size: 16px;
  background-color: #41a1cb;
  color: #fff;
  border: 0px;
  cursor: pointer;
}

.hotkey a {
  text-decoration: none;
  color: #666;
  padding-right: 15px;
}

.weather_list {
  height: 200px;
  text-align: center;
}

.weather_list li {
  display: inline-block;
  width: 140px;
  height: 200px;
  padding: 0 10px;
  overflow: hidden;
  position: relative;
  background-color:#d9ecff;
  background-size: 1px 130px;
}


.info_type {
  margin-top:50px;
  color: #014A54;
  font-size:20px;
  line-height: 30px;
}

.info_temp {
  margin-top:20px;
  color: #014A54;
  font-size: 20px;
}

.info_date {
  height: 40px;
  line-height: 40px;
  color: #999;

}

</style>