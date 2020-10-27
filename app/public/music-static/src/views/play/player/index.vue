<!--
 * @Author: your name
 * @Date: 2020-07-17 12:40:22
 * @LastEditTime: 2020-10-25 21:28:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\player\index.vue
-->
<template>
  <d2-container type="ghost">
    <template slot="header">播放器设置</template>
    <el-row type="flex" justify="space-between">
      <el-col :span="12" class="d2-mr-20">
        <el-card>
          <el-collapse v-model="currentCollapse">
            <el-collapse-item name="domain">
              <template slot="title">
                <h3>已授权域名</h3>
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-table
                :data="domains"
                style="width: 100%;border:none"
                v-loading="!domains"
              >
                <el-table-column prop="domainName" label="域名网址">
                </el-table-column>
                <el-table-column
                  prop="domainDesc"
                  label="备注"
                  class="max-text-lang"
                >
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="danger"
                      plain
                      size="mini"
                      icon="el-icon-delete"
                      @click="delDomain(row)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item name="playlist">
              <template slot="title">
                <h3>已加载歌单</h3>
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-table
                :data="loadedPlayList"
                v-loading="!loadedPlayList"
                style="width: 100%;border:none"
              >
                <el-table-column prop="name" label="歌单名"> </el-table-column>
                <el-table-column
                  prop="desc"
                  label="歌单描述"
                  class="max-text-lang"
                >
                  <template slot-scope="{ row }">
                    <el-tooltip
                      effect="dark"
                      :content="row.desc"
                      placement="right"
                    >
                      <span class="list-item">
                        {{ row.desc }}
                      </span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="danger"
                      plain
                      size="mini"
                      icon="el-icon-delete"
                      @click="del(row)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
          <tabs :labels="rightBottomLabels" @TabChange="leftBottomTabChange">
          </tabs>
          <keep-alive>
            <component
              @addRankPlaylist="addplaylist"
              :is="currentComponent2"
              @add="addplaylist"
            ></component>
          </keep-alive>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <tabs :labels="rightTopLabels" @TabChange="rightTopTabChange"> </tabs>
          <keep-alive>
            <component
              :is="currentComponent"
              :propPlaylist="loadedPlayList"
              :propSetting="setting"
              :propName="name"
              @save="save"
              @addAuth="addAuth"
            ></component>
          </keep-alive>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import tabs from "../components/tabs";
import domainAuthorization from "../components/domainAuthorization";
import getCode from "../components/getCode";
import customSetting from "../components/customSetting";
import myPlaylist from "../components/myPlaylist";
import commonPlaylist from "../components/commonPlaylist";
import rankPlaylist from "../components/rankPlaylist";
import { mapState } from "vuex";
export default {
  name: "player",
  components: {
    tabs,
    getCode,
    domainAuthorization,
    customSetting,
    myPlaylist,
    commonPlaylist,
    rankPlaylist
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  async created() {
    await this.init();
  },
  watch: {
    async $route(nVal, oVal) {
      await this.init();
    }
  },
  methods: {
    // async addRankPlaylist(row) {
    //   this.loadedPlayList.push({
    //     name: row.name,
    //     desc: row.desc
    //   });
    // },
    async addplaylist(current) {
      if (this.loadedPlayList.find(item => item.uuid === current.uuid)) {
        return this.$message.warning("不能重复添加");
      }
      this.loadedPlayList.push(current);
      this.$set(current, "disabled", true);
    },
    del(current) {
      this.loadedPlayList.splice(
        this.loadedPlayList.findIndex(item => item.uuid === current.uuid),
        1
      );
      this.$set(current, "disabled", false);
    },
    delDomain(current) {
      this.domains.splice(
        this.domains.findIndex(item => item.domainName === current.domainName),
        1
      );
    },
    async addAuth({ desc, domain }) {
      if (this.domains.find(item => item.domainName === domain)) {
        return this.$message.warning("不能重复添加");
      }
      this.domains.push({ domainName: domain, domainDesc: desc });
    },
    async save(setting, name) {
      await this.$api.SYS_PLAYER_UPDATE(this.$route.params.id, this.info.name, {
        setting,
        loadedPlayList: this.loadedPlayList,
        domains: this.domains,
        name
      });
      this.$router.go(0);
    },
    async init() {
      const res = await this.$api.SYS_PLAYER_FIND(this.$route.params.id);
      const { setting, desc, domains, loadedPlayList, name } = res.data;
      this.setting = JSON.parse(setting);
      this.domains = JSON.parse(domains);
      this.loadedPlayList = JSON.parse(loadedPlayList);
      this.name = name;
    },
    rightTopTabChange(ele) {
      this.currentComponent = ele;
    },
    leftBottomTabChange(ele) {
      this.currentComponent2 = ele;
    }
  },
  data() {
    return {
      setting: null,
      desc: "",
      domains: null,
      loadedPlayList: [],
      name: "",
      currentComponent: "customSetting",
      currentComponent2: "myPlaylist",
      currentCollapse: ["domain", "playlist"],
      rightBottomLabels: [
        { label: "我的歌单", name: "myPlaylist" },
        // { label: "公用歌单", name: "commonPlaylist" },
        { label: "歌单排行", name: "rankPlaylist" }
      ],
      rightTopLabels: [
        { label: "个性设置", name: "customSetting" },
        { label: "域名授权", name: "domainAuthorization" },
        // { label: "网络歌曲", name: "networkSong" },
        { label: "获取代码", name: "getCode" }
        // { label: "手动添加", name: "manualAdd" },
        // { label: "歌曲排行", name: "songRank" },
        // { label: "歌单排行", name: "playListRank" }
      ]
    };
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
