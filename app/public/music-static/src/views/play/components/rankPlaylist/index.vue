<!--
 * @Author: your name
 * @Date: 2020-07-24 13:38:36
 * @LastEditTime: 2020-10-21 20:27:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\rankPlaylist\index.vue
-->
<template>
  <el-table
    style="width: 100%;border:none"
    :data="data"
    v-loading="!data.length"
  >
    <el-table-column prop="name" label="歌单名">
      <template slot-scope="{ row }">
        <div flex=" cross:center">
          <el-image style="width: 25px; height: 25px;" :src="row.pic" lazy>
          </el-image>

          <span class="list-item"> {{ row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="描述" prop="desc" class="list-item">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" :content="row.desc" placement="right">
          <span class="list-item">
            {{ row.desc }}
          </span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="平台" prop="platform"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="{ row }">
        <el-button
          type="success"
          plain
          size="mini"
          icon="el-icon-folder-add"
          @click="addRankPlaylist(row)"
          :disabled="row.disabled"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  async created() {
    const { data } = await this.$api.SYS_PLAY_RANK();
    this.data = [...data.netease];
  },
  methods: {
    addRankPlaylist(row) {
      this.$emit("addRankPlaylist", row);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  @extend %m-text-max;
  width: 110px;
  margin-left: 10px;
  display: block;
}
</style>
