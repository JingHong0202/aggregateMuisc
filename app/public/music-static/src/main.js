/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:13
 * @LastEditTime: 2020-07-12 18:13:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\main.js
 */

// Vue
import Vue from "vue";
import i18n from "./i18n";
import App from "./App";
// 核心插件
import d2Admin from "@/plugin/d2admin";
// store
import store from "@/store/index";

// 菜单和路由设置
import router from "./router";
import { frameInRoutes } from "@/router/routes";

// 核心插件
Vue.use(d2Admin);

new Vue({
  router,
  store,
  i18n,

  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit("d2admin/page/init", frameInRoutes);
  },
  mounted() {
    // 展示系统信息
    this.$store.commit("d2admin/releases/versionShow");
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch("d2admin/account/load");
    // 获取并记录用户 UA
    this.$store.commit("d2admin/ua/get");
    // 初始化全屏监听
    this.$store.dispatch("d2admin/fullscreen/listen");
  }
}).$mount("#app");
