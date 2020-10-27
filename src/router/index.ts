import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Generator",
    component: () =>
      import(/* webpackChunkName: "colors" */ "../views/Colors/Generator.vue"),
    meta: {
      title: "配色",
      key: "colors",
      icon: "el-icon-orange"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
