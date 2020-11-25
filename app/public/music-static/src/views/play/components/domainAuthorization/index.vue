<!--
 * @Author: your name
 * @Date: 2020-07-24 13:09:59
 * @LastEditTime: 2020-11-25 20:48:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\domainAuthorization\index.vue
-->
<template>
  <div>
    <el-alert
      title="域名授权不包含“http:”和“//”等特殊符号，授权顶级域名则授权所有二级域名（泛域名）
中文域名请转码后授权，如发现授权或加载异常，请尝试：授权*（星号）关闭域名授权"
      type="success"
      :closable="false"
      style="margin-bottom:15px"
    >
    </el-alert>
    <div class="d2-mb-15">
      <el-input
        placeholder="请输入域名网址"
        v-model="domain"
        class="w-50"
        clearable
      >
        <template slot="prepend">域名网址</template>
      </el-input>
    </div>
    <div class="d2-mb-15">
      <el-input placeholder="网站备注" v-model="desc" class="w-50" clearable>
        <template slot="prepend">网站备注</template>
      </el-input>
    </div>
    <div class="d2-mb-15 ">
      <el-button type="primary" @click="addAuth">新增授权</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async addAuth() {
      if (!this.domain || !/(.+[\.]){1,2}([a-z]+)$/i.test(this.domain)) {
        return this.$message.warning("域名格式错误");
      }
      this.$emit("addAuth", {
        domain: this.domain,
        desc: this.desc
      });
    }
  },
  data() {
    return {
      domain: "",
      desc: ""
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
