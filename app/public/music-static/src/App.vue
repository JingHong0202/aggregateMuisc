<!--
 * @Author: your name
 * @Date: 2020-06-29 18:45:13
 * @LastEditTime: 2020-07-12 19:15:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from "@/libs/util";

export default {
  name: "app",

  methods: {
    // i18nHandle (val, oldVal) {
    //   util.cookies.set('lang', val)
    //   document.querySelector('html').setAttribute('lang', val)
    // }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
