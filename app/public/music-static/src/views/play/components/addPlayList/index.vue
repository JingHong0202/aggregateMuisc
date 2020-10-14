<!--
 * @Author: your name
 * @Date: 2020-07-18 20:21:22
 * @LastEditTime: 2020-07-23 15:06:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\addPlayList\index.vue
-->
<template>
  <div>
    <el-alert
      title="使用歌单ID或歌手ID直接导入歌曲到当前歌单，建议歌单内歌曲不超过100首
如非必要，在基本设置选择歌单类型为调用，无需导入歌单即可加载歌单！"
      type="success"
      :closable="false"
      style="margin-bottom:15px"
    >
    </el-alert>
    <el-select
      v-model="form.platformVal"
      placeholder="请选择平台"
      class="block-mb-15 w-50"
    >
      <el-option
        v-for="item in form.platform"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input
      placeholder="请输入歌单ID"
      v-model="form.input"
      class="d2-mt-15"
      clearable
    >
      <template slot="prepend">歌单ID</template>
      <el-button
        class="m-hover m-btn"
        slot="append"
        icon="el-icon-folder-add
"
        type="primary"
        :loading="loading"
        @click="addplaylist"
        >导入歌单</el-button
      >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "addPlayList",
  methods: {
    async addplaylist() {
      if (!this.form.input || !this.form.platformVal)
        return this.$message.warning("请选择参数");
      let res;
      this.loading = true;
      let { input, platformVal } = this.form;
      try {
        res = await this.$api.SYS_PLAYLIST_LIST({
          platform: platformVal,
          mode: "playlist",
          action: input
        });
      } catch (error) {
        this.loading = false;
      }
      this.$emit("importplaylist", res);
      this.loading = false;
    }
  },
  data() {
    return {
      loading: false,
      form: {
        input: "",
        platform: [
          { label: "网易云", value: "netease" },
          { label: "QQ音乐", value: "tencent" }
        ],
        platformVal: null
      }
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
