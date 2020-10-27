<!--
 * @Author: your name
 * @Date: 2020-07-18 20:21:22
 * @LastEditTime: 2020-07-23 15:08:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\addPlayList\index.vue
-->
<template>
  <div>
    <el-alert
      title="歌单缓存：保存歌单会自动清理缓存"
      type="success"
      :closable="false"
      style="margin-bottom:15px"
    >
    </el-alert>

    <div class="d2-mb-15">
      <el-input
        placeholder="请输入歌单名称"
        v-model="name"
        class="w-50  "
        clearable
      >
        <template slot="prepend">歌单名称</template>
      </el-input>
    </div>
    <div class="d2-mb-15">
      <el-input
        placeholder="请输入歌单描述"
        v-model="desc"
        clearable
        type="textarea"
        autosize
      >
      </el-input>
    </div>
    <div class="d2-mb-15 w-50" flex="main:center">
      <el-button type="primary" @click="save">保存 </el-button>
      <el-button type="danger" @click="del">删除 </el-button>
      <el-button type="warning" @click="truncate">清空 </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "setting",
  props: {
    propName: {
      type: String,
      default: ""
    },
    propDesc: {
      type: String,
      default: ""
    },
    propList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    propName(n, o) {
      this.name = n;
    },
    propDesc(n, o) {
      this.desc = n;
    }
  },
  computed: {
    ...mapState("d2admin/page", ["current"]),
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/page", ["close"]),
    truncate() {
      this.$confirm("确定要清空吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$emit("truncate");
        })
        .catch(async () => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
        });
    },
    async save() {
      this.$confirm("确定要保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const name = this.info.name;
          await this.$api.SYS_PLAYLIST_UPDATE(this.$route.params.id, name, {
            name: this.name,
            desc: this.desc,
            playlist: JSON.stringify(this.propList)
          });
          this.$emit("update");
        })
        .catch(async () => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    async del() {
      this.$confirm("此操作将永久删除该歌单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const name = this.info.name;
          await this.$api.SYS_PLAYLIST_DEL(this.$route.params.id, name);
          await this.close({ tagName: this.current });
        })
        .catch(async () => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    }
  },
  data() {
    return {
      name: "",
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
