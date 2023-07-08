import Vue from 'vue'
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css'; // 添加
import ElementUI from 'element-ui';// 添加
import App from './App.vue'
import router from './router'
import './assets/gloable.css'
import request from '@/utils/request'//添加
import fx67llClock from 'fx67ll-clock'


Vue.use(VueRouter);
Vue.use(fx67llClock)
Vue.config.productionTip = false
Vue.use(ElementUI);// 添加
Vue.prototype.request=request // 添加


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

