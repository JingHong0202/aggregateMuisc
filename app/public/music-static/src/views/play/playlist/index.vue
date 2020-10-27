<!--
 * @Author: your name
 * @Date: 2020-07-17 12:40:22
 * @LastEditTime: 2020-10-25 22:39:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\player\index.vue
-->
<template>
  <d2-container type="ghost">
    <template slot="header">歌单管理</template>
    <el-row type="flex" justify="space-between">
      <el-col :span="12" class="d2-mr-20">
        <el-card>
          <el-collapse v-model="currentCollapse">
            <el-collapse-item name="songlist" class="m-collapse ">
              <template slot="title">
                <h3>歌曲列表</h3>
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-table
                :data="songlistTableData"
                style="width: 100%;border:none"
                v-loading="loading2"
              >
                <el-table-column prop="name" label="歌名" width="200">
                  <template slot-scope="{ row }">
                    <div flex=" cross:center">
                      <el-image
                        style="width: 25px; height: 25px;"
                        :src="row.image"
                        lazy
                      >
                      </el-image>
                      <el-tooltip
                        effect="dark"
                        :content="row.name"
                        placement="right"
                      >
                        <span class="list-item"> {{ row.name }}</span>
                      </el-tooltip>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="singer" label="歌手名">
                  <template slot-scope="{ row }">
                    <div flex=" cross:center">
                      <el-tooltip
                        effect="dark"
                        :content="row.singer"
                        placement="right"
                      >
                        <span class="list-item"> {{ row.singer }}</span>
                      </el-tooltip>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="danger"
                      plain
                      size="mini"
                      icon="el-icon-delete-solid"
                      @click="del(row)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item name="searchlist" class="m-collapse">
              <template slot="title">
                <h3>搜索列表</h3>
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-table
                v-infinite-scroll="load"
                :data="searchTableData"
                style="width: 100%;border:none"
                infinite-scroll-delay="1000"
                :infinite-scroll-immediate="false"
                :infinite-scroll-disabled="end"
              >
                <el-table-column prop="name" label="歌名" width="200">
                  <template slot-scope="{ row }">
                    <div flex=" cross:center">
                      <el-image
                        style="width: 25px; height: 25px;"
                        :src="row.image"
                      >
                      </el-image>
                      <el-tooltip
                        effect="dark"
                        :content="row.name"
                        placement="right"
                      >
                        <span class="list-item"> {{ row.name }}</span>
                      </el-tooltip>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="singer" label="歌手名">
                  <template slot-scope="{ row }">
                    <div flex=" cross:center">
                      <el-tooltip
                        effect="dark"
                        :content="row.singer"
                        placement="right"
                      >
                        <span class="list-item"> {{ row.singer }}</span>
                      </el-tooltip>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="success"
                      plain
                      size="mini"
                      icon="el-icon-folder-add"
                      @click="addSong(row)"
                      :disabled="row.used"
                    ></el-button>
                  </template>
                </el-table-column>
                <template slot="append">
                  <p
                    class="m-loading"
                    element-loading-text="拼命加载中"
                    v-loading="loading"
                    element-loading-spinner="el-icon-loading"
                    v-if="!end && loading"
                  ></p>
                  <p class="m-loading" v-if="end && searchTableData.length">
                    已经到最底了!
                  </p>
                </template>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-loading="loading2">
          <tabs :labels="labels" @TabChange="TabChange"> </tabs>
          <keep-alive>
            <component
              :is="currentComponent"
              :propName="name"
              :propDesc="desc"
              :propList="songlistTableData"
              @update="update"
              @changeList="changeList"
              @importplaylist="importplaylist"
              @truncate="truncate"
            ></component>
          </keep-alive>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import tabs from "../components/tabs";
import addPlayList from "../components/addPlayList";
import searchAdd from "../components/searchAdd";
import setting from "../components/setting";
export default {
  name: "playlist",
  components: { tabs, addPlayList, searchAdd, setting },
  data() {
    return {
      currentPage: 1,
      searchParams: {},
      end: false,
      loading: false,
      data: [],
      name: "",
      desc: "",
      currentCollapse: ["songlist"],
      searchTableData: [],
      songlistTableData: [],
      currentComponent: "setting",
      labels: [
        { label: "基本设置", name: "setting" },
        // { label: "网络歌曲", name: "networkSong" },
        { label: "搜索添加", name: "searchAdd" },
        // { label: "手动添加", name: "manualAdd" },
        { label: "歌单导入", name: "addPlayList" }
        // { label: "歌曲排行", name: "songRank" },
        // { label: "歌单排行", name: "playListRank" }
      ]
    };
  },
  methods: {
    async load() {
      if (!this.searchTableData.length) return;

      this.$confirm("要加载下一页吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          this.loading = true;
          try {
            let res = await this.$api.SYS_PLAYLIST_SEARCH({
              ...this.searchParams,
              uuid: this.$route.params.id,
              page:
                this.searchParams.platform === "netease"
                  ? (this.currentPage += +this.searchParams.limit)
                  : (this.currentPage += 1)
            });
            this.searchTableData = [
              ...this.searchTableData,
              ...this._normlize(res)
            ];
          } catch (error) {
            this.loading = false;
            this.end = true;
          }
          this.loading = false;
        })
        .catch(async () => {
          this.$message({
            type: "info",
            message: "已取消加载"
          });
        });
    },
    truncate() {
      this.songlistTableData = [];
    },
    async importplaylist(res) {
      // this.songlistTableData = [];
      this.songlistTableData = [...this.songlistTableData, ...res];
      this.$nextTick(() => {
        this.currentCollapse.push("songlist");
      });
    },
    del(current) {
      this.songlistTableData.splice(
        this.songlistTableData.findIndex(item => item.id === current.id),
        1
      );
      this.$set(current, "used", false);
    },
    async addSong(current) {
      if (this.songlistTableData.find(item => item.id === current.id))
        return this.$message.warning("歌曲重复");
      this.currentCollapse.push("songlist");
      this.songlistTableData.push(current);
      this.$set(current, "used", true);
    },
    async changeList(data, params) {
      this.currentPage = 1;
      this.searchParams = params;
      this.searchTableData = this._normlize(data);
      this.$nextTick(() => {
        this.currentCollapse.push("searchlist");
      });
    },
    async TabChange(component) {
      this.currentComponent = component;
    },
    async init() {
      // let loading = this.$loading({
      //   lock: true,
      //   text: "Loading",
      //   spinner: "el-icon-loading",
      //   background: "rgba(255, 255, 255, .4)"
      // });
      this.loading2 = true;
      let { data } = await this.$api.SYS_PLAYLIST_FIND(this.$route.params.id);
      this.name = data.name;
      this.desc = data.desc;
      this.songlistTableData = JSON.parse(data.playlist) || [];

      this.$nextTick(() => {
        this.loading2 = false;
        this.$forceUpdate();
      });
    },
    async update() {
      await this.init();
    },
    _normlize(data) {
      return data.map(item => {
        return {
          ...item
          // time: `${
          //   Math.ceil(item.duration / 60) < 10
          //     ? `0${Math.ceil(item.duration / 60)}`
          //     : Math.ceil(item.duration / 60)
          // }:${
          //   item.duration % 60 < 10
          //     ? `0${item.duration % 60}`
          //     : item.duration % 60
          // }`,
        };
      });
    }
  },
  watch: {
    async $route() {
      await this.init();
    }
  },
  async created() {
    await this.init();
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  @extend %m-text-max;
  width: 110px;
  margin-left: 10px;
}
.m-loading {
  @extend %m-loading;
}
.m-collapse {
  max-height: 35vh;
  overflow: auto;
}
.m-50 {
  margin-bottom: 50px;
}
</style>
