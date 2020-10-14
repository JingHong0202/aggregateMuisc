/*
 * @Author: your name
 * @Date: 2020-07-10 14:50:00
 * @LastEditTime: 2020-07-10 14:55:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\demo\charts\list\_mixin\list.js
 */
import Vue from "vue";
import VCharts from "v-charts";
Vue.use(VCharts);

export default {
  data() {
    return {
      pubSetting: {
        height: "100%"
      }
    };
  }
};
