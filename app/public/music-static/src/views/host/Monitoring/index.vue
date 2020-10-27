<!--
 * @Author: your name
 * @Date: 2020-07-11 23:14:11
 * @LastEditTime: 2020-10-25 21:27:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\host\Monitoring\index.vue
-->
<template>
  <d2-container>
    <el-table
      :data="logs"
      size="mini"
      style="width: 100%"
      empty-text="暂无日志信息"
      stripe
    >
      <!-- 时间 -->
      <el-table-column prop="date" label="date" width="170"> </el-table-column>
      <!-- host -->
      <el-table-column prop="hostname" label="hostname" width="170">
      </el-table-column>
      <!-- 分类 -->
      <el-table-column prop="level" label="level" width="170">
      </el-table-column>
      <!-- 信息 -->
      <el-table-column prop="msg" label="message" align="center">
      </el-table-column>
    </el-table>

    <template slot="footer">
      <span>选择日志:</span>&nbsp;&nbsp;&nbsp;
      <el-select v-model="currentLogs" placeholder="请选择日志">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left:15px" @click="handleDelete">
        <d2-icon name="el-icon-delete" />
        删除日志
      </el-button>
    </template>
  </d2-container>
</template>

<script>
// import { mapState } from "vuex";
// import { get } from "lodash";
export default {
  name: "monitoring",
  data() {
    return {
      uploading: false,
      logs: [],
      currentLogs: null,
      options: [],
      data: []
    };
  },
  watch: {
    async currentLogs(newVal, oldVal) {
      this.logs = this.data.find(item => item.name === newVal).content;
    }
  },
  async created() {
    await this.getLogs();
  },
  computed: {
    // ...mapState("d2admin/log", ["log"])
  },
  methods: {
    async getLogs() {
      const logs = this._normlize(await this.$api.SYS_LOGS_DATA());
      this.data = logs;
      this.logs = logs[2].content;
      this.options = logs.map(item => {
        return {
          value: item.name,
          label: item.name,
          key: item.name
        };
      });
      this.currentLogs = this.options[0].value;
    },
    _normlize(logs) {
      const setup = logs.map(item => {
        let content = item ? item.content.split("\n") : "";
        content.pop();
        content = content.map(item2 => {
          const level = item2.match(/\"level\":\"(([\s\S]+?))\"/)[2];
          const date = item2.match(/\"date\":\"(([\s\S]+?))\"/)[2];
          const hostname = item2.match(/\"hostname\":\"(([\s\S]+?))\"/)[2];
          return {
            level,
            date,
            hostname,
            msg: item2
          };
        });
        return {
          name: item.name,
          content
        };
      });
      return setup;
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$api.SYS_LOGS_TRUNCATE();
          await this.getLogs();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
    // get,
    // handleShowMore(log) {
    //   // 打印一条日志的所有信息到控制台
    //   this.$notify({
    //     type: "info",
    //     title: "日志详情",
    //     message: "完整的日志内容已经打印到控制台"
    //   });
    //   this.$log.capsule("D2Admin", "handleShowMore", "primary");
    //   console.group(log.message);
    //   console.log("time: ", log.time);
    //   console.log("type: ", log.type);
    //   console.log(log.meta);
    //   console.groupEnd();
    // },
    // // 日志上传
    // handleUpload() {
    //   this.uploading = true;
    //   this.$notify({
    //     type: "info",
    //     title: "日志上传",
    //     message: `开始上传${this.log.length}条日志`
    //   });
    //   setTimeout(() => {
    //     this.uploading = false;
    //     this.$notify({
    //       type: "success",
    //       title: "日志上传",
    //       message: "上传成功"
    //     });
    //   }, 3000);
    // }
  }
};
</script>
