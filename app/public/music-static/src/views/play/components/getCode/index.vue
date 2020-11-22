<!--
 * @Author: your name
 * @Date: 2020-07-24 13:09:59
 * @LastEditTime: 2020-11-22 21:50:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\domainAuthorization\index.vue
-->
<template>
  <div>
    <div class="d2-mb-15">
      <el-input v-model="id" class="w-50" clearable disabled>
        <template slot="prepend">播放器ID</template>
      </el-input>
    </div>
    <el-alert
      title="将此段播放器代码插入到网页最底部的</body></html>标签之前"
      type="success"
      :closable="false"
      style="margin-bottom:15px"
    >
    </el-alert>

    <el-input v-model="scription" clearable type="textarea" autosize>
    </el-input>
  </div>
</template>

<script>
export default {
  created() {
    this.id = this.$route.params.id;
    console.log(process.env);
    this.scription = `<script id='aggregate' key='${this.id}'  src='//${
      process.env.NODE_ENV === "production"
        ? window.location.host
        : process.env.VUE_APP_API
    }/play/player?a=getCode' async > <\/script>`;
  },
  data() {
    return {
      id: "",
      scription: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.block-mb-15 {
  display: block;
  margin-top: 15px;
}
.w-50 {
  width: 50%;
}
.m-hover:hover {
  background: #409eff;
  color: white;
}
.m-btn {
  transition: all 0.3s;
}
</style>
