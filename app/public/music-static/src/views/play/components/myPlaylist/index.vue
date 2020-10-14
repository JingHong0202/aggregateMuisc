<!--
 * @Author: your name
 * @Date: 2020-07-24 13:39:22
 * @LastEditTime: 2020-07-28 21:36:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\myPlaylist\index.vue
-->
<template>
  <el-table :data="$playlist" style="width: 100%;border:none">
    <el-table-column prop="name" label="歌单名"> </el-table-column>
    <el-table-column prop="desc" label="歌单描述" class="max-text-lang">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="{ row }">
        <el-button
          type="success"
          plain
          size="mini"
          icon="el-icon-folder-add"
          @click="add(row)"
          :disabled="row.disabled"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    async add(current) {
      this.$emit("add", current);
    }
  }
};
</script>

<style lang="scss" scoped>
.max-text-lang {
  @extend %m-text-max;
}
</style>
