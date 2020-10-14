<!--
 * @Author: your name
 * @Date: 2020-07-18 20:21:22
 * @LastEditTime: 2020-07-23 22:26:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\addPlayList\index.vue
-->
<template>
  <div>
    <el-alert
      title="请使用“歌曲名”或“歌曲名歌手名”搜索"
      type="success"
      :closable="false"
      style="margin-bottom:15px"
    >
    </el-alert>
    <!-- <el-radio-group v-model="form.radio">
      <el-radio-button label="添加到顶部"></el-radio-button>
      <el-radio-button label="添加到底部"></el-radio-button>
    </el-radio-group> -->
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
    <el-select
      v-model="form.searchItemVal"
      placeholder="请选择搜索条数"
      class="block-mb-15 w-50"
    >
      <el-option
        v-for="item in form.searchItem"
        :key="item.value"
        :label="item.value + '条'"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input
      placeholder="请输入搜索词"
      v-model="form.input"
      class=" d2-mt-15"
      clearable
    >
      <el-button
        class="m-hover m-btn"
        slot="append"
        icon="el-icon-search"
        type="primary"
        @click="search"
        :loading="loading"
        >点击搜索</el-button
      >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "searchAdd",
  methods: {
    async search() {
      if (!this.form.input || !this.form.platformVal || !this.form.searchItem)
        return this.$message.warning("请选择参数");
      this.loading = true;
      let { platformVal, input, searchItemVal } = this.form;
      try {
        let params = {
          platform: platformVal,
          mode: "search",
          action: input,
          limit: searchItemVal,
          uuid: this.$route.params.id
        };
        let res = await this.$api.SYS_PLAYLIST_SEARCH(params);
        this.$emit("changeList", res, params);
      } catch (error) {
        this.loading = false;
      }
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
        platformVal: null,
        searchItem: [
          { value: "20" },
          { value: "40" },
          { value: "60" },
          { value: "80" },
          { value: "100" }
        ],
        searchItemVal: null
        // radio: "添加到顶部"
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
