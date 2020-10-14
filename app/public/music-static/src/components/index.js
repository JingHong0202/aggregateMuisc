/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:14
 * @LastEditTime: 2020-07-10 14:05:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\components\index.js
 */

import Vue from "vue";

import d2Container from "./d2-container";

// 注意 有些组件使用异步加载会有影响
Vue.component("d2-container", d2Container);
Vue.component("d2-icon", () => import("./d2-icon"));
Vue.component("d2-count-up", () => import("./d2-count-up"));
Vue.component("d2-icon-svg", () => import("./d2-icon-svg/index.vue"));
