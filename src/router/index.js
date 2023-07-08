import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'
import Login from '../../../help-oringal/src/views/Login.vue'
import HomePage from "@/components/HomePage/homepage.vue";
import admin from "@/components/User/admin.vue";
import AdminLogin from "@/../../../help-oringal/src/views/AdminLogin.vue";
import City from "@/components/Shop/city.vue";
import manage from "@/views/Manage.vue";
import LeaseOrder from "@/components/Order/leaseorder.vue";
import LockerInfor from "@/components/Locker/lockerinfor.vue";
import ShopLocker from "@/components/Locker/shoplocker.vue";
import Shop from "@/components/Shop/shop.vue";
import Register from "@/components/Customer/register.vue";
import Ordering from "@/components/PayOrder/Ordering.vue";
import CustomerHome from "@/components/PayOrder/CustomerHome.vue";
import MyOrder from "@/components/PayOrder/MyOrder.vue";
import Weather from "@/components/PayOrder/weather.vue";


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
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () => import('../components/User/client.vue')
      }, {
        path: '/homepage',
        name:'HomePage',
        // meta: {
        //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // },
        component: HomePage
      },
      {
        path: '/admin',
        name:'admin',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: admin
      },
      {
        path: '/leaseorder',
        name:'LeaseOrder',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: LeaseOrder
      },

      {
        path: '/city',
        name: 'City',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: City
      },
      {
        path: '/lockerinfor',
        name:'LockerInfor',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: LockerInfor
      },
      {
        path: '/shoplocker',

        name:'ShopLocker',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ShopLocker
      },
      {
        path: '/Shop',
        name:'shop',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
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
    // meta: {
    //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    // },
    component: CustomerHome
  },
  {
    path: '/Ordering',
    name:'Ordering',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component:Ordering
  },
  {
    path: '/MyOrder',
    name:'MyOrder',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component:MyOrder
  },
  {
    path: '/weather',
    name:'Weather',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component:Weather
  }

]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 全局路由拦截，防止未登录访问页面
 router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // 判断条件，例如检查用户是否已登录或 token 是否存在
    next('/Login'); // 如果不满足条件，重定向到登录页面
  } else {
    next(); // 如果满足条件，继续路由跳转
  }
});



function isLoggedIn() {
  // 返回登录状态或 token 是否存在的判断逻辑
}
const originalPush = VueRouter.prototype.push; VueRouter.prototype.push = function push(location, onResolve, onReject) { if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject); return originalPush.call(this, location).catch((err) => err); };
export default router
