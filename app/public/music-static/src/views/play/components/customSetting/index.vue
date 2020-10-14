<!--
 * @Author: your name
 * @Date: 2020-07-24 13:09:59
 * @LastEditTime: 2020-09-23 14:20:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\domainAuthorization\index.vue
-->
<template>
  <div>
    <el-alert
      title="保存成功后,需刷新网页后查看效果"
      type="success"
      :closable="false"
      style="margin-bottom:15px"
    >
    </el-alert>
    <!-- <el-row>
      <el-col :lg="12" flex="box:mean" :md="24">
        <el-switch
          v-model="setting.showLyric"
          inactive-text="显示歌词"
          :width="50"
        >
        </el-switch>
        <el-switch
          v-model="setting.randomPlay"
          inactive-text="随机播放"
          :width="50"
        >
        </el-switch>
      </el-col>
      <el-col :lg="12" flex="box:mean" :md="24">
        <el-switch
          v-model="setting.autoPlay"
          inactive-text="自动播放"
          :width="50"
        >
        </el-switch>
        <el-switch
          v-model="setting.notice"
          inactive-text="桌面通知"
          :width="50"
        >
        </el-switch>
      </el-col>
    </el-row> -->
    <!-- <el-row class="d2-mt-20">
      <el-col :lg="5" :md="24" flex="cross:center" class="switch">
        <el-switch
          v-model="setting.autoshow"
          inactive-text="自动弹出"
          :width="50"
        >
        </el-switch>
      </el-col>
      <el-col :lg="12" :md="23">
        <el-input
          placeholder="几秒后弹出"
          v-model="setting.autoshowInterval"
          clearable
        >
          <template slot="prepend">几秒后弹出</template>
        </el-input>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :lg="12" flex="box:mean" :md="24">
        <el-switch
          v-model="setting.welcomeShow"
          inactive-text="显示欢迎语"
          :width="50"
        >
        </el-switch>
        <el-switch
          v-model="setting.autoPlay"
          inactive-text="自动播放"
          :width="50"
        >
        </el-switch>
      </el-col>
      <el-col :lg="12" flex="box:mean" :md="24">
        <el-switch
          v-model="setting.lyricShow"
          inactive-text="开启歌词"
          :width="50"
        >
        </el-switch>
        <el-switch
          v-model="setting.mediaShow"
          inactive-text="开启可视化"
          :width="50"
        >
        </el-switch>
      </el-col>
    </el-row>
    <el-row class="d2-mt-20">
      <el-col :lg="9" :md="24" class="d2-mr-20 d2-mt-20">
        <div flex="dir-left">
          <span class="prepend">播放模式</span>
          <el-select placeholder="播放模式" v-model="setting.mode">
            <el-option
              v-for="item in modeLabels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :lg="9" :md="24" class="d2-mt-20">
        <el-input placeholder="欢迎语" v-model="setting.welcome" clearable>
          <template slot="prepend">欢迎语</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="d2-mt-10">
      <el-col :lg="9" :md="24" class="d2-mt-20 d2-mr-20" flex="dir-left">
        <span class="prepend">默认音量</span>

        <el-slider
          v-model="setting.volume"
          style="width: 100%;
    padding: 0 10px 0 10px;"
        ></el-slider>
      </el-col>
      <el-col :lg="9" :md="24" class="d2-mt-20">
        <!-- <el-input placeholder="默认专辑" v-model="setting.album" clearable>
          <template slot="prepend">默认专辑</template>
        </el-input> -->
        <div flex="dir-left">
          <span class="prepend">默认专辑</span>
          <el-select placeholder="默认专辑" v-model="setting.album">
            <el-option
              v-for="item in propPlaylist"
              :key="item.uuid"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="9" :md="24" class="d2-mt-20 d2-mr-20">
        <el-input placeholder="播放器名称" v-model="name" clearable>
          <template slot="prepend">播放器名称</template>
        </el-input>
      </el-col>
      <!-- <el-col :lg="9" :md="24" class="d2-mt-20">
        <div flex="dir-left">
          <span class="prepend">位置显示</span>
          <el-select placeholder="位置显示" v-model="setting.position">
            <el-option
              v-for="item in positionLabels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col> -->
      <el-col :lg="9" :md="24" class="d2-mt-20">
        <el-input-number
          v-model="setting.interval"
          :min="1"
          :max="10"
          label="弹出时间"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="9" :md="24" class="d2-mt-20 d2-mr-20">
        <div flex="dir-left">
          <span class="prepend">默认皮肤</span>
          <el-select placeholder="默认皮肤" v-model="setting.style">
            <el-option
              v-for="item in styleLabels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :lg="9" :md="24" class="d2-mt-20">
        <div flex="dir:left">
          <span class="prepend">默认颜色</span>
          <el-color-picker v-model="setting.color"></el-color-picker>
        </div>
      </el-col>
    </el-row>
    <div class="d2-mb-15  d2-mt-20">
      <el-button @click="save" type="primary">保存 </el-button>
      <el-button type="danger" @click="del">删除 </el-button>
      <el-button @click="test" type="warning">测试 </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("d2admin/page", ["current"])
  },
  props: {
    propSetting: {
      type: Object,
      default: () => {}
    },
    propName: {
      type: String,
      default: ""
    },
    propPlaylist: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    propSetting(n, o) {
      this.setting = n;
    },
    propName(n, o) {
      this.name = n;
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["close"]),
    del() {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$api.SYS_PLAY_DEL(this.$route.params.id);
          await this.close({ tagName: this.current });
        })
        .catch(async () => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
    test() {
      this.$confirm("确定要测试吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (document.querySelector("#aggregate")) {
            document.body.removeChild(document.querySelector("#aggregate"));
            document.body.removeChild(document.querySelector("#aggregate-run"));
            document.body.removeChild(
              document.querySelector(".aggregate-player")
            );
          }
          let Script = document.createElement("script");
          Script.id = "aggregate";
          Script.setAttribute("key", `${this.$route.params.id}`);
          Script.async = true;
          Script.src = "//localhost:7001/play/player?a=getCode";
          document.body.appendChild(Script);
        })
        .catch(async () => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
    save() {
      this.$confirm("确定要保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$emit("save", this.setting, this.name);
        })
        .catch(async () => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    }
  },
  data() {
    return {
      styleLabels: [
        {
          label: "默认",
          value: "normlize"
        }
      ],
      name: "",
      modeLabels: [
        { label: "顺序", value: "0" },
        { label: "随机", value: "1" },
        { label: "循环", value: "2" }
      ],
      // albumLabels: [],
      positionLabels: [
        { label: "左下", value: "leftBottom" },
        { label: "左上", value: "leftTop" },
        { label: "左中", value: "leftCenter" },
        { label: "右下", value: "rightBottom" },
        { label: "右下", value: "rightTop" },
        { label: "右中", value: "rightCenter" }
      ],
      setting: {}
    };
  }
};
</script>

<style lang="scss">
.switch {
  height: 40px;
  margin-right: 20px;
  white-space: nowrap;
}
// .prepend {
//   @extend .prepend;
// }
.w-50 {
  width: 50%;
}
</style>
