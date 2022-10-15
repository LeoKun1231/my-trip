/*
 * @Author: hqk
 * @Date: 2022-09-11 13:33:00
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-15 13:36:31
 * @Description: 
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/home.vue")
  },
  {
    path: "/favor",
    name: "favor",
    component: () => import("@/views/favor/favor.vue")
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/order.vue")
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/message/message.vue"),
    meta: {
      isNotShowTabBar: true
    }
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/city/city.vue"),
    meta: {
      isNotShowTabBar: true
    }
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/search.vue"),
    meta: {
      isNotShowTabBar: true
    }
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/views/detail/detail.vue"),
    meta: {
      isNotShowTabBar: true
    }
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router