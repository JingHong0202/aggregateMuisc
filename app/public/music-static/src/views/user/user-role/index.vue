<!--
 * @Author: your name
 * @Date: 2020-06-29 18:45:16
 * @LastEditTime: 2020-09-27 13:56:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\user\user-role\index.vue
-->
<template>
  <d2-container>
    <template slot="header">角色管理</template>
    <el-button type="primary" @click="showPanel"
      >添加角色<i class="el-icon-plus el-icon--right"></i
    ></el-button>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      ref="table"
      class="d2-mt-15"
    >
      <el-table-column prop="rolename" label="角色名"> </el-table-column>
      <el-table-column prop="roledesc" label="角色描述"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <span>{{ props }}</span>
        </template>
      </el-table-column>
      <template slot="empty">
        <p class="m-noneData">没有数据</p>
      </template>
    </el-table>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="角色名" label-width="70px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="form.roledesc"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-divider><span>角色权限</span></el-divider>
        <el-form-item>
          <el-row>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">歌单创建最大值</span>
              <el-input-number
                v-model="Rules.playlistCount"
                :min="1"
                :max="commonRules.playlistMaxCount"
              ></el-input-number>
            </el-col>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">播放器创建最大值</span>
              <el-input-number
                v-model="Rules.playerCount"
                :min="1"
                :max="3"
              ></el-input-number>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">歌曲最大值</span>
              <el-input-number
                v-model="Rules.songlistCount"
                :min="1"
                :max="commonRules.songlistMaxCount"
              ></el-input-number>
            </el-col>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">域名绑定最大值</span>
              <el-input-number
                v-model="Rules.domainCount"
                :min="1"
                :max="commonRules.domainMaxCount"
              ></el-input-number>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible2">
      <el-form :model="addForm" label-position="left" ref="addRule">
        <el-form-item label="角色名" label-width="70px">
          <el-input v-model="addForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="addForm.roledesc"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-divider><span>角色权限</span></el-divider>
        <el-form-item>
          <el-row>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">歌单创建最大值</span>
              <el-input-number
                v-model="addRules.playlistCount"
                :min="1"
                :max="commonRules.playlistMaxCount"
              ></el-input-number>
            </el-col>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">播放器创建最大值</span>
              <el-input-number
                v-model="addRules.playerCount"
                :min="1"
                :max="3"
              ></el-input-number>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">歌曲最大值</span>
              <el-input-number
                v-model="addRules.songlistCount"
                :min="1"
                :max="commonRules.songlistMaxCount"
              ></el-input-number>
            </el-col>
            <el-col :lg="12" flex class="d2-mt-10">
              <span class="prepend d2-mr-10">域名绑定最大值</span>
              <el-input-number
                v-model="addRules.domainCount"
                :min="1"
                :max="commonRules.domainMaxCount"
              ></el-input-number>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addRule">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      slot="footer"
      background
      @size-change="pageSizeChange"
      @current-change="pageChange"
      :page-sizes="[10, 30, 50, 80, 100]"
      :page-count="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
export default {
  name: "user-role",
  watch: {
    dialogFormVisible2(n, o) {
      if (!n) {
        Object.keys(this.addForm).forEach((item, i) => {
          this.addForm[item] = "";
        });
        Object.keys(this.addRules).forEach((item, i) => {
          this.addRules[item] = 1;
        });
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  data() {
    return {
      form: {
        rolename: "",
        roledesc: ""
      },
      Rules: {
        playerCount: 1,
        playlistCount: 1,
        songlistCount: 1,
        domainCount: 1
      },
      addForm: {
        rolename: "",
        roledesc: ""
      },
      addRules: {
        playerCount: 1,
        playlistCount: 1,
        songlistCount: 1,
        domainCount: 1
      },
      tableData: [],
      tableLoading: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      commonRules: {},
      count: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  async created() {
    this.tableLoading = true;
    await this.list();
    let commonRules = await this.$api.SYS_ROLE_COMMON_RULES();
    this.commonRules = commonRules;

    this.tableLoading = false;
  },
  methods: {
    async pageSizeChange(num) {
      this.pageSize = num;
      await this.list(this.currentPage, this.pageCount);
    },
    async pageChange(num) {
      this.currentPage = num;
      await this.list(this.currentPage, this.pageCount);
    },
    async addRule() {
      let { rolename, roledesc } = this.addForm;
      await this.$api.SYS_ROLE_ADD_RULES({
        rolename,
        roledesc,
        permissions: JSON.stringify(this.addRules)
      });
      this.dialogFormVisible2 = false;
      await this.list();
    },
    showPanel() {
      this.dialogFormVisible2 = true;
    },
    async list() {
      let res = await this.$api.SYS_ROLE_LIST();
      this.tableData = res.data;
      this.count = res.count;
    },
    async submit() {
      let permissions = JSON.stringify(this.Rules),
        { rolename, roledesc } = this.form;
      await this.$api.SYS_ROLE_UPDATE_RULES({
        roledesc,
        rolename,
        permissions
      });
      this.dialogFormVisible = false;
      await this.list();
    },
    handleEdit(i, current) {
      this.dialogFormVisible = true;
      let { rolename, roledesc, permissions } = current;
      this.form.rolename = rolename;
      this.form.roledesc = roledesc;
      this.Rules = permissions ? JSON.parse(permissions) : {};
    },
    handleDelete(i, current) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$api.SYS_ROLE_DELETE_RULES(current.rolename);
          await this.list();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
