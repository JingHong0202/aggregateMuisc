<!--
 * @Author: your name
 * @Date: 2020-06-29 18:45:16
 * @LastEditTime: 2020-09-27 14:05:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\user\user-list\index.vue
-->
<template>
  <d2-container>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="user">
        <el-form-item label="用户名" label-width="120px">
          <el-input
            v-model="form.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option
              v-for="(item, i) in roles"
              :label="item"
              :value="item"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态" label-width="120px" prop="state">
          <el-switch v-model="form.state"></el-switch>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" :rules="rules" ref="user2">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="form2.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input
            type="password"
            v-model="form2.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px" prop="role">
          <el-select v-model="form2.role" placeholder="请选择角色">
            <el-option
              v-for="(item, i) in roles"
              :label="item"
              :value="item"
              :key="i"
            ></el-option>
            <!-- <el-option label="管理员" value="1"></el-option>
            <el-option label="普通人员" value="2"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态" label-width="120px" prop="state">
          <el-switch v-model="form2.state"></el-switch>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="form2.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible2">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </div>
    </el-dialog>
    <template slot="header">用户列表</template>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%;"
      ref="table"
    >
      <el-table-column prop="username" label="用户名">
        <template slot="header" slot-scope="scope">
          {{ scope.column.label }}
          <el-tooltip
            class="item"
            effect="dark"
            content="添加用户"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-plus"
              style="margin-left:15px"
              circle
              size="mini"
              @click="addUser"
            ></el-button>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <div class="user-name">
            <el-avatar> {{ scope.row.username[0] }} </el-avatar
            >{{ scope.row.username }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="账户状态">
        <template slot-scope="scope">
          <el-tag :type="+scope.row.state ? 'success' : 'danger'">
            {{ +scope.row.state ? "正常" : "封禁" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="lastTime" label="最后登录时间">
        <template slot-scope="scope">
          {{ new Date(scope.row.lastTime).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <div style="display:flex;justify-content: center;align-items: center">
            <el-input v-model="wd" size="small" placeholder="输入关键字搜索" />
            <el-tooltip
              class="item"
              effect="dark"
              content="点击搜索"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-search"
                style="margin-left:15px"
                size="small"
                @click="search"
              ></el-button>
            </el-tooltip>
          </div>
        </template>
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
      <template slot="empty">
        <p class="m-noneData">没有数据</p>
      </template>
    </el-table>

    <el-pagination
      slot="footer"
      background
      @size-change="pageSizeChange"
      @current-change="pageChange"
      :page-sizes="[10, 30, 50, 80, 100]"
      :page-count="pageNum"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
export default {
  name: "user-list",
  async created() {
    await this.getList();
    await this.getRoles();
    document.onkeyup = async e => {
      if (e.code === "Enter") {
        await this.search();
      }
    };
  },
  async activated() {
    document.onkeyup = async e => {
      if (e.code === "Enter") {
        await this.search();
      }
    };
  },
  async deactivated() {
    document.onkeyup = null;
  },
  async beforeDestroy() {
    document.onkeyup = null;
  },
  methods: {
    async search() {
      if (!this.wd) return this.getList();
      await this.getList("", this.wd);
    },
    async addUser() {
      this.dialogFormVisible2 = true;
    },
    async pageChange(page) {
      await this.getList(page, this.wd);
    },
    async getRoles() {
      const roles = await this.$api.SYS_ROLE_LIST();
      this.roles = roles.data.map(item => item.rolename);
    },
    async getList(page, wd = "") {
      this.loading = true;
      const res = await this.$api.SYS_USER_LIST(page || "", this.pageSize, wd);
      this.tableData = res.data;
      this.total = res.count;
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    async submit() {
      this.$refs.user.validate(async valid => {
        if (valid) {
          await this.$api.SYS_USER_EDIT(this.form, {
            email: this.tableData[this.currentIndex].email,
            username: this.tableData[this.currentIndex].username
          });
          this.visible();
          await this.getList();
        } else {
          this.$message.error("表单检验错误");
        }
      });
    },
    async visible2() {
      this.dialogFormVisible2 = false;
      // delete this.currentIndex;
      this.form2 = {};
    },
    async submit2() {
      this.$refs.user2.validate(async valid => {
        if (valid) {
          await this.$api.SYS_USER_ADD(this.form2);
          this.visible2();
          await this.getList();
        } else {
          this.$message.error("表单检验错误");
        }
      });
    },
    pageSizeChange(num) {
      this.pageSize = num;
      this.getList();
    },
    async visible() {
      this.dialogFormVisible = false;
      delete this.currentIndex;
      this.form = {};
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.currentIndex = index;
      this.form = { ...row, state: !!+row.state };
      delete this.form.lastTime;
      // console.log(index, row);
      // await this.$api.SYS_USER_EDIT(row)
    },
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$api.SYS_USER_DELETE(row.username, row.email);
          await this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    pageNum() {
      return Math.floor(this.total / this.pageSize);
    }
  },
  data() {
    return {
      roles: [],
      wd: "",
      loading: false,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在6-12位",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "无效的邮箱或格式错误", trigger: "blur" }
        ]
      },
      dialogFormVisible2: false,
      form2: {}
    };
  }
};
</script>
<style lang="scss" scoped>
.user-name {
  display: flex;
  align-items: center;
  font-weight: bold;
  & *:first-child {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
