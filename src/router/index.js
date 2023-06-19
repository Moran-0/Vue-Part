import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'
import Login from '../views/Login.vue'
import HomePage from "@/components/HomePage/homepage.vue";
import admin from "@/components/User/admin.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import City from "@/components/Shop/city.vue";
import App from "@/App.vue";
import manage from "@/views/Manage.vue";
import LeaseOrder from "@/components/Order/leaseorder.vue";
import LockerInfor from "@/components/Locker/lockerinfor.vue";
import ShopLocker from "@/components/Locker/shoplocker.vue";
import Shop from "@/components/Shop/shop.vue";

import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, codeToText, textToCode } from 'element-china-area-data'
import Register from "@/components/Customer/register.vue";
import Ordering from "@/components/PayOrder/Ordering.vue";
import CustomerHome from "@/components/PayOrder/CustomerHome.vue";
import MyOrder from "@/components/PayOrder/MyOrder.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manage',
    redirect: '/Login',
    component: Manage,
    children:[
      {
        path: '/client',
        name: 'Client',
        component: () => import('../components/User/client.vue')
      }, {
        path: '/homepage',
        name:'HomePage',
        component: HomePage
      },
      {
        path: '/admin',
        name:'admin',
        component: admin
      },
      {
        path: '/leaseorder',
        name:'LeaseOrder',
        component: LeaseOrder
      },

      {
        path: '/city',
        name: 'City',
        component: City
      },
      {
        path: '/lockerinfor',
        name:'LockerInfor',
        component: LockerInfor
      },
      {
        path: '/shoplocker',
        name:'ShopLocker',
        component: ShopLocker
      },
      {
        path: '/Shop',
        name:'shop',
        component:Shop
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/AdminLogin',
    name:'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/Manage',
    name:'manage',
    redirect: '/homepage',
    component: manage
  },
  {
    path: '/register',
    name:'register',
    component: Register
  },
  {
    path: '/CustomerHome',
    name:'CustomerHome',
    component: CustomerHome
  },
  {
    path: '/Ordering',
    name:'Ordering',
    component:Ordering
  },
  {
    path: '/MyOrder',
    name:'MyOrder',
    component:MyOrder
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局路由拦截，防止未登录访问页面
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//       next();
//     }
//     else {
//       next({
//         path: '/Login',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }
//   else {
//     next();
//   }
// })

const originalPush = VueRouter.prototype.push; VueRouter.prototype.push = function push(location, onResolve, onReject) { if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject); return originalPush.call(this, location).catch((err) => err); };
export default router
